import { calculateComsumption } from "../utils/calculateComsumption.js";
import { Validator } from "jsonschema";
import { output } from "../schemas/inputOutputSchema.js";
import { validateSchema } from "../utils/validateSchema.js";

export const isClientElectable = (document) => {
    let result;
    const inegibilityReasons = [];

    const isComsumptionClassElectable = verifyComsumptionClass(document.classeDeConsumo);
    const isTariffModalityElectable = verifyTariffModality(document.modalidadeTarifaria);
    const isMinimumComsumptionElectable = verifyMinimumComsumption(document.tipoDeConexao, document.historicoDeConsumo)

    !isComsumptionClassElectable && inegibilityReasons.push('Classe de consumo não aceita');
    !isTariffModalityElectable && inegibilityReasons.push('Modalidade tarifária não aceita');
    !isMinimumComsumptionElectable && inegibilityReasons.push('Consumo muito baixo para tipo de conexão');

    if (inegibilityReasons.length === 0) {
        //considerando que para serem gerados 1000 kWh no Brasil são emitidos em média 84kg de CO2.
        const co2 = 84;
        const { totalComsumption } = calculateComsumption(document.historicoDeConsumo);

        result = {
            "elegivel": true,
            "economiaAnualDeCO2": ( totalComsumption * co2 ) / 1000
         }
    } else {
        result = {
            "elegivel": false,
            "razoesInelegibilidade": inegibilityReasons,
         }       
    }

    validateSchema(result, output);

    return result;
};

export const verifyComsumptionClass = (comsumptionClass) => {
    if (comsumptionClass === 'poderPublico' || comsumptionClass === 'rural') {
        return false
    }
    return true;
};

export const verifyTariffModality = (tariffModality) => {
    if (tariffModality === 'azul' || tariffModality === 'verde') {
        return false
    }
    return true;
};

export const verifyMinimumComsumption = (conectionType, comsumptionHistory) => {
    const { averageComsumption } = calculateComsumption(comsumptionHistory);

    if (conectionType === 'monofasico') {
        return averageComsumption > 400 ? true : false
    }
    if (conectionType === 'bifasico') {
        return averageComsumption > 500 ? true : false
    }
    if (conectionType === 'trifasico') {
        return averageComsumption > 750 ? true : false
    }
};