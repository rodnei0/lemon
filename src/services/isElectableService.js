import { calculateComsumption } from '../utils/calculateComsumption.js';

export const isClientElectable = ({classeDeConsumo, modalidadeTarifaria, tipoDeConexao, historicoDeConsumo}) => {
	let result;
	const inegibilityReasons = [];

	const isComsumptionClassElectable = verifyComsumptionClass(classeDeConsumo);
	const isTariffModalityElectable = verifyTariffModality(modalidadeTarifaria);
	const isMinimumComsumptionElectable = verifyMinimumComsumption(tipoDeConexao, historicoDeConsumo);

	!isComsumptionClassElectable && inegibilityReasons.push('Classe de consumo não aceita');
	!isTariffModalityElectable && inegibilityReasons.push('Modalidade tarifária não aceita');
	!isMinimumComsumptionElectable && inegibilityReasons.push('Consumo muito baixo para tipo de conexão');

	if (inegibilityReasons.length === 0) {
		//considering that to generate 1000 kWh in Brazil, an average of 84 kg of CO2 is emitted
		const CO2 = 84;
		const { totalComsumption } = calculateComsumption(historicoDeConsumo);

		result = {
			'elegivel': true,
			'economiaAnualDeCO2': ( totalComsumption * CO2 ) / 1000
		};
	} else {
		result = {
			'elegivel': false,
			'razoesInelegibilidade': inegibilityReasons,
		};       
	}

	return result;
};

export const verifyComsumptionClass = (comsumptionClass) => {
	if (comsumptionClass === 'poderPublico' || comsumptionClass === 'rural') {
		return false;
	}
	return true;
};

export const verifyTariffModality = (tariffModality) => {
	if (tariffModality === 'azul' || tariffModality === 'verde') {
		return false;
	}
	return true;
};

export const verifyMinimumComsumption = (conectionType, comsumptionHistory) => {
	const { averageComsumption } = calculateComsumption(comsumptionHistory);

	if (conectionType === 'monofasico') {
		return averageComsumption > 400 ? true : false;
	}
	if (conectionType === 'bifasico') {
		return averageComsumption > 500 ? true : false;
	}
	if (conectionType === 'trifasico') {
		return averageComsumption > 750 ? true : false;
	}
};