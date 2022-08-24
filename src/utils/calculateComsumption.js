export const calculateComsumption = (comsumptionHistory) => {
	let total = 0;
	let counter = 0;

	comsumptionHistory.forEach((item) => {
		total += item;
		counter++;
	});

	return {
		averageComsumption: total / counter,
		totalComsumption: total
	};
};