"""Synthetic arithmetic fixtures, not real commercial assumptions."""
import copy
import importlib.util
import unittest
from pathlib import Path
spec = importlib.util.spec_from_file_location('economics', Path(__file__).with_name('pricing-economics.py'))
economics = importlib.util.module_from_spec(spec)
spec.loader.exec_module(economics)

class EconomicsTests(unittest.TestCase):
    def setUp(self):
        self.pricing = {'currency': 'PEN', 'plans': [{'id': 'test', 'name': 'Test', 'monthlyPrice': 118, 'setupPrice': 236}]}
        self.inputs = {'schemaVersion': 1, 'currency': 'PEN', 'salesTaxPercent': 18,
            'targetContributionMarginPercent': 60, 'monthlyFixedCosts': 1000,
            'plans': {'test': {'monthlyInfrastructure': 10, 'monthlySupportHours': 1,
                'hourlyLaborCost': 20, 'monthlyOtherVariableCosts': 10,
                'setupHours': 3, 'setupOtherCosts': 20}}}

    def result(self):
        return economics.calculate(self.pricing, self.inputs)['plans'][0]

    def test_net_tax_margin_setup_and_break_even(self):
        result = self.result()
        self.assertEqual(result['monthlyNetOfSalesTax'], '100.00')
        self.assertEqual(result['monthlyContribution'], '60.00')
        self.assertEqual(result['contributionMarginPercent'], '60.00')
        self.assertTrue(result['meetsTargetMargin'])
        self.assertEqual(result['minimumGrossMonthlyForTarget'], '118.00')
        self.assertEqual(result['accountsToCoverFixedCostsIfOnlyThisPlan'], 17)
        self.assertEqual(result['setupContribution'], '120.00')

    def test_missing_inputs_do_not_create_profit(self):
        self.inputs['salesTaxPercent'] = None
        report = economics.calculate(self.pricing, self.inputs)
        self.assertEqual(report['status'], 'missing-inputs')
        self.assertEqual(report['plans'], [])
        self.assertIn('salesTaxPercent', report['missingInputs'])

    def test_zero_and_negative_contribution_have_no_break_even(self):
        for cost in [70, 71]:
            self.inputs['plans']['test']['monthlyOtherVariableCosts'] = cost
            self.assertIsNone(self.result()['accountsToCoverFixedCostsIfOnlyThisPlan'])
            self.assertEqual(self.result()['breakEvenStatus'], 'non-positive-contribution')

    def test_explicit_zero_tax_and_costs(self):
        self.inputs['salesTaxPercent'] = 0
        self.inputs['monthlyFixedCosts'] = 0
        self.assertEqual(self.result()['monthlyNetOfSalesTax'], '118.00')
        self.assertEqual(self.result()['accountsToCoverFixedCostsIfOnlyThisPlan'], 0)

    def test_invalid_inputs_are_rejected(self):
        for field, value in [('salesTaxPercent', -1), ('salesTaxPercent', True),
                             ('salesTaxPercent', '18'), ('salesTaxPercent', float('nan')),
                             ('targetContributionMarginPercent', 100)]:
            inputs = copy.deepcopy(self.inputs)
            inputs[field] = value
            with self.assertRaises(ValueError):
                economics.calculate(self.pricing, inputs)
        self.inputs['plans']['stale'] = {}
        with self.assertRaises(ValueError):
            economics.calculate(self.pricing, self.inputs)

    def test_floor_rounds_up_and_input_is_unchanged(self):
        original = copy.deepcopy(self.inputs)
        self.inputs['targetContributionMarginPercent'] = 61
        self.assertEqual(self.result()['minimumGrossMonthlyForTarget'], '121.03')
        self.inputs['targetContributionMarginPercent'] = 60
        self.assertEqual(self.inputs, original)

if __name__ == '__main__':
    unittest.main()
