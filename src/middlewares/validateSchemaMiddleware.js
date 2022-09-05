import { Validator } from 'jsonschema';
import { cpf, cnpj } from 'cpf-cnpj-validator'; 

export const validateSchemaMiddleware = (schema) => {
	return (req, res, next) => {
		const validate = new Validator();
		const validation = validate.validate(req.body, schema);
		const errorsMessage = validation.errors.map(item => 
			item.message
		);

		const { numeroDoDocumento } = req.body;

		if (numeroDoDocumento.length === 11) {
			if (!cpf.isValid(numeroDoDocumento)) {
				errorsMessage.push('CPF inválido');
			}
		}

		if (numeroDoDocumento.length === 14) {
			if (!cnpj.isValid(numeroDoDocumento)) {
				errorsMessage.push('CNPJ inválido');
			}
		}

		if (errorsMessage.length > 0) {
			return res.status(400).send({ error: 'Schema inválido!', message: errorsMessage });
		}

		next();
	};
};