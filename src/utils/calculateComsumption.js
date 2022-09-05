export const calculateComsumption = (comsumptionHistory) => {
	const totalComsumption = comsumptionHistory.reduce(
		(previousValue, currentValue) => previousValue + currentValue,
		0
	);

	return {
		averageComsumption: totalComsumption / comsumptionHistory.length,
		totalComsumption: totalComsumption
	};
};