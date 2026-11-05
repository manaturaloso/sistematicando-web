import data from '../../content/pricing.json';
export const pricing=data;
export const money=(value:number)=>new Intl.NumberFormat('es-PE',{style:'currency',currency:pricing.currency,minimumFractionDigits:0,maximumFractionDigits:2}).format(value);
export const moduleInPlan=(moduleId:string,planId:string)=>pricing.plans.find(plan=>plan.id===planId)!.moduleIds.includes(moduleId);
export const addonForModule=(moduleId:string,planId:string)=>pricing.addons.find(addon=>addon.moduleIds.includes(moduleId)&&addon.planIds.includes(planId));
