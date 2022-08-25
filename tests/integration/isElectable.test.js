import app from '../../src/app';
import supertest from 'supertest';
import { Validator } from 'jsonschema';
import { output } from '../../src/schemas/inputOutputSchema.js';

describe('POST /iseligible', () => {
	it('giving a valid body and eligible data should return status 200 and a valid response', async () => {
		const body = {
			'numeroDoDocumento': '14041737706',
			'tipoDeConexao': 'bifasico',
			'classeDeConsumo': 'comercial',
			'modalidadeTarifaria': 'convencional',
			'historicoDeConsumo': [
				3878,
				9760,
				5976
			]
		};

		const result = await supertest(app).post('/iseligible').send(body);
		const validate = new Validator();
		const validation = validate.validate(result.body, output);

		expect(result.status).toEqual(200);
		expect(result.body.elegivel).toEqual(true);
		expect(typeof result.body.economiaAnualDeCO2).toBe('number');
		expect(validation.errors.length).toEqual(0);
	});

	it('giving a valid body and ineligible data (comsumption class) should return status 200 and and a valid response', async () => {
		const body = {
			'numeroDoDocumento': '14041737706',
			'tipoDeConexao': 'bifasico',
			'classeDeConsumo': 'rural',
			'modalidadeTarifaria': 'convencional',
			'historicoDeConsumo': [
				3878,
				9760,
				5976
			]
		};

		const result = await supertest(app).post('/iseligible').send(body);
		const validate = new Validator();
		const validation = validate.validate(result.body, output);

		expect(result.status).toEqual(200);
		expect(result.body.elegivel).toEqual(false);
		expect(result.body.razoesInelegibilidade).toEqual(['Classe de consumo não aceita']);
		expect(validation.errors.length).toEqual(1);
	});

	it('giving an invalid body (no comsumption history) should return status 400 and an error message', async () => {
		const body = {
			'numeroDoDocumento': '14041737706',
			'tipoDeConexao': 'bifasico',
			'classeDeConsumo': 'comercial',
			'modalidadeTarifaria': 'convencional',
			'historicoDeConsumo': []
		};

		const result = await supertest(app).post('/iseligible').send(body);

		expect(result.status).toEqual(400);
		expect(result.body.message).toEqual(['does not meet minimum length of 3']);
	});
});