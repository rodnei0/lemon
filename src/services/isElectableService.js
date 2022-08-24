export const isClientElectable = (document) => {
    const razoesInelegibilidade = [];

    const isComsumptionClassElectable = verifyComsumptionClass(document.classeDeConsumo);
    const isTariffModalityElectable = verifyTariffModality(document.modalidadeTarifaria);
    const isMinimumComsumptionElectable = verifyMinimumComsumption(document.tipoDeConexao, document.historicoDeConsumo)

    !isComsumptionClassElectable && razoesInelegibilidade.push('Classe de consumo não aceita');
    !isTariffModalityElectable && razoesInelegibilidade.push('Modalidade tarifária não aceita');
    !isMinimumComsumptionElectable && razoesInelegibilidade.push('Consumo mínimo não aceito');

    if (razoesInelegibilidade.length === 0) {
        return {
            "elegivel": true,
            "economiaAnualDeCO2": 5553.24,
         }
    } else {
        return {
            "elegivel": false,
            "razoesInelegibilidade": razoesInelegibilidade,
         }       
    }
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
    const averageComsumption = calculateAverage(comsumptionHistory);

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

export const calculateAverage = (comsumptionHistory) => {
    let total = 0;
    let counter = 0;

    comsumptionHistory.forEach((item) => {
        total += item;
        counter++;
    });

    return total / counter;
}