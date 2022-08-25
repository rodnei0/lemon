import * as isEligibleService from '../../src/services/isEligibleService.js';

describe('isEligible service unit tests', () => {
	it('should return false if comsumption class == "poderPublico" or "rural"', async () => {
		const result  = isEligibleService.verifyComsumptionClass('rural');

		expect(result).toEqual(false);
	});

	it('should return false if tariff modality == "azul" or "verde"', async () => {
		const result  = isEligibleService.verifyTariffModality('azul');

		expect(result).toEqual(false);
	});

	it('should return true if conection type == "monofasico" and average comsumption > 400', async () => {
		const result  = isEligibleService.verifyMinimumComsumption('monofasico', [500, 500, 500]);

		expect(result).toEqual(true);
	});

	it('should return false if conection type == "monofasico" and average comsumption < 400', async () => {
		const result  = isEligibleService.verifyMinimumComsumption('monofasico', [300, 300, 300]);

		expect(result).toEqual(false);
	});

	it('should return false if conection type == "bifasico" and average comsumption < 500', async () => {
		const result  = isEligibleService.verifyMinimumComsumption('bifasico', [400, 400, 400]);

		expect(result).toEqual(false);
	});

	it('should return true if conection type == "trifasico" and average comsumption > 750', async () => {
		const result  = isEligibleService.verifyMinimumComsumption('trifasico', [800, 800, 800]);

		expect(result).toEqual(true);
	});

	it('should return false if conection type == "trifasico" and average comsumption < 750', async () => {
		const result  = isEligibleService.verifyMinimumComsumption('trifasico', [700, 700, 700]);

		expect(result).toEqual(false);
	});
});