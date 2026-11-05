"""Internal scenario calculator; never changes prices or approves profitability."""
import argparse
import hashlib
import json
from decimal import Decimal, ROUND_CEILING, ROUND_HALF_UP
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ZERO = Decimal(0)
HUNDRED = Decimal(100)


def number(value, label, ceiling=None):
    if isinstance(value, bool) or not isinstance(value, (int, float, Decimal)):
        raise ValueError(f'{label}: se requiere un número, no texto ni booleano')
    result = Decimal(str(value))
    if not result.is_finite() or result < 0 or (ceiling is not None and result >= ceiling):
        raise ValueError(f'{label}: valor fuera de rango')
    return result


def money(value):
    return str(value.quantize(Decimal('.01'), rounding=ROUND_HALF_UP))


def calculate(pricing, assumptions):
    if assumptions.get('currency') != pricing['currency']:
        raise ValueError('La moneda del escenario debe coincidir con los precios')
    if assumptions.get('schemaVersion') != 1:
        raise ValueError('schemaVersion debe ser 1')
    ids = {p['id'] for p in pricing['plans']}
    if set(assumptions.get('plans', {})) != ids:
        raise ValueError('El escenario debe contener exactamente los planes vigentes')
    global_keys = ['salesTaxPercent', 'targetContributionMarginPercent', 'monthlyFixedCosts']
    keys = ['monthlyInfrastructure', 'monthlySupportHours', 'hourlyLaborCost',
            'monthlyOtherVariableCosts', 'setupHours', 'setupOtherCosts']
    missing = []
    for key in global_keys:
        value = assumptions.get(key)
        if value is None:
            missing.append(key)
        else:
            number(value, key, HUNDRED if key == 'targetContributionMarginPercent' else None)
    for plan in pricing['plans']:
        costs = assumptions['plans'][plan['id']]
        for key in keys:
            value = costs.get(key)
            if value is None:
                missing.append(f"plans.{plan['id']}.{key}")
            else:
                number(value, key)
    report = {'schemaVersion': 1, 'scope': 'internal-base-plan-scenarios-only',
              'currency': pricing['currency'], 'publishAuthorized': False,
              'financialApproval': False, 'status': 'missing-inputs' if missing else 'scenario-calculated',
              'missingInputs': missing, 'plans': []}
    if missing:
        return report
    tax_factor = 1 + number(assumptions['salesTaxPercent'], 'salesTaxPercent') / HUNDRED
    target = number(assumptions['targetContributionMarginPercent'], 'targetContributionMarginPercent') / HUNDRED
    fixed = number(assumptions['monthlyFixedCosts'], 'monthlyFixedCosts')
    for plan in pricing['plans']:
        c = {key: number(assumptions['plans'][plan['id']][key], key) for key in keys}
        net = number(plan['monthlyPrice'], 'monthlyPrice') / tax_factor
        setup_net = number(plan['setupPrice'], 'setupPrice') / tax_factor
        if net == 0:
            raise ValueError('monthlyPrice debe ser positivo')
        variable = c['monthlyInfrastructure'] + c['monthlySupportHours'] * c['hourlyLaborCost'] + c['monthlyOtherVariableCosts']
        contribution = net - variable
        setup_cost = c['setupHours'] * c['hourlyLaborCost'] + c['setupOtherCosts']
        minimum = variable / (1 - target) * tax_factor
        # Round floors upward so a displayed cent cannot undershoot the target.
        floor = str(minimum.quantize(Decimal('.01'), rounding=ROUND_CEILING))
        report['plans'].append({'id': plan['id'], 'name': plan['name'],
            'monthlyGross': money(net * tax_factor), 'monthlyNetOfSalesTax': money(net),
            'monthlyVariableCosts': money(variable), 'monthlyContribution': money(contribution),
            'contributionMarginPercent': money(contribution / net * HUNDRED),
            'meetsTargetMargin': contribution / net >= target,
            'minimumGrossMonthlyForTarget': floor,
            'accountsToCoverFixedCostsIfOnlyThisPlan': int((fixed / contribution).to_integral_value(rounding=ROUND_CEILING)) if contribution > 0 else None,
            'breakEvenStatus': 'finite' if contribution > 0 else 'non-positive-contribution',
            'setupNetOfSalesTax': money(setup_net), 'setupCosts': money(setup_cost),
            'setupContribution': money(setup_net - setup_cost)})
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('assumptions', type=Path)
    args = parser.parse_args()
    try:
        pricing = json.loads((ROOT / 'content/pricing.json').read_text(), parse_float=Decimal)
        assumptions = json.loads(args.assumptions.read_text(), parse_float=Decimal)
        report = calculate(pricing, assumptions)
        report['sourceHashes'] = {
            'pricingSha256': hashlib.sha256((ROOT / 'content/pricing.json').read_bytes()).hexdigest(),
            'assumptionsSha256': hashlib.sha256(args.assumptions.read_bytes()).hexdigest()}
        print(json.dumps(report, ensure_ascii=False, indent=2))
    except (ValueError, KeyError, TypeError, OSError) as error:
        parser.exit(2, f'Escenario inválido: {error}\n')


if __name__ == '__main__':
    main()
