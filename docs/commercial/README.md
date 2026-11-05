# Escenarios internos de costos

Esta herramienta sigue el pendiente económico de PRICING_STRATEGY.md. No cambia precios ni acredita rentabilidad, tributación o disponibilidad del SaaS. No forma parte de /admin ni del sitio compilado: usa Python 3 estándar y lee los planes actuales de content/pricing.json. No añade dependencias.

## Uso

Copiar la plantilla a un archivo privado fuera del repositorio, completar datos y ejecutar:

```sh
cp docs/commercial/cost-assumptions.example.json /tmp/sistematicando-costs.json
# Editar /tmp/sistematicando-costs.json con datos reales.
python3 scripts/pricing-economics.py /tmp/sistematicando-costs.json > /tmp/sistematicando-economics.json
python3 scripts/test-pricing-economics.py
```

La plantilla versionada conserva todos los supuestos desconocidos en null. No guardar costos confidenciales en Git ni incluir escenarios reales en el paquete de revisión compartido. La salida JSON no se guarda automáticamente; el operador elige dónde conservarla. Una salida missing-inputs es un resultado válido de preparación, no una aprobación. Entrada inválida produce código 2 y mensaje en stderr.

## Campos y unidades

- currency: PEN, igual que la propuesta.
- salesTaxPercent: impuesto indirecto incluido en precio final, expresado en porcentaje (no fracción). Introducir el valor realmente aplicable; 0 debe ser explícito cuando corresponda. La herramienta no determina régimen ni tasa y no calcula impuesto a la renta.
- targetContributionMarginPercent: objetivo del operador, entre 0 inclusive y 100 exclusivo. No hay objetivo recomendado por defecto.
- monthlyFixedCosts: costos compartidos mensuales del negocio en soles; no duplicar costos ya asignados por cuenta.
- Por cada plan: monthlyInfrastructure y monthlyOtherVariableCosts son costos mensuales por cuenta, en soles; monthlySupportHours son horas mensuales por cuenta; hourlyLaborCost es costo total por hora; setupHours son horas de puesta en marcha por cuenta; setupOtherCosts son costos únicos adicionales por cuenta.

Los costos deben expresarse sobre una base consistente con ingresos sin impuesto indirecto; incluir impuestos no recuperables como costo cuando corresponda. Revisarlo con el responsable contable. Usar el alcance/cupos completos del plan, incluidas sus sedes, al estimar costos por cuenta. Deben figurar exactamente los IDs de los planes vigentes: cambios de catálogo exigen actualizar el escenario.

## Fórmulas y límites

Ingreso neto = precio final / (1 + impuesto/100). Costo variable = infraestructura + horas de soporte × costo/hora + otros costos variables. Contribución = ingreso neto − costo variable; margen = contribución / ingreso neto. No es utilidad neta.

Cuentas para cubrir costos fijos = techo(costos fijos / contribución), calculadas para una cartera hipotética compuesta únicamente por ese plan; no sumar los umbrales de planes ni interpretarlos como mezcla comercial. Si la contribución es cero o negativa, el umbral es null y el estado non-positive-contribution; no dividir por cero ni informar recuperación imposible como finita.

Cuota mínima para el margen objetivo = costo variable / (1 − margen objetivo/100) × (1 + impuesto/100), redondeada hacia arriba al céntimo. Los otros valores se muestran con dos decimales y los umbrales usan precisión decimal antes del redondeo. Es una referencia de escenario, no una modificación automática del precio. Puesta en marcha se calcula por separado y no subsidia el punto de equilibrio mensual.

Alcance: solo planes base. Complementos, mezcla de cuentas, adquisición comercial, impagos, descuentos, comisiones, crecimiento de costos por escalones y flujo de caja requieren evaluación adicional; incluir los costos aplicables de cada cuenta en sus campos antes de usar un resultado. Los hashes de precio y supuestos identifican la entrada usada, no confirman su veracidad. FinancialApproval y publishAuthorized siempre false.

## Verificación y siguiente paso

Seis pruebas sintéticas verifican impuesto/margen/puesta en marcha/umbral, datos faltantes, contribución cero/negativa, ceros explícitos, rechazo de valores inválidos y redondeo superior. Los números de los fixtures no son costos ni tasas aprobados para Sistematicando. CI ejecuta estas pruebas sin escenarios comerciales reales. No se ha confirmado su resultado remoto.

Siguiente paso exacto: completar una copia privada con costos medidos, objetivo de margen e impuesto confirmado; ejecutar, revisar resultados y registrar en LAUNCH_DECISIONS.md únicamente la decisión comercial aprobada y su evidencia apropiada. Costos siguen desconocidos; no publicar ni cambiar tarifas automáticamente. Agente: Codex principal, sin subagentes.
