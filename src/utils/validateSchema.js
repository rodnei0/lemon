import { Validator } from 'jsonschema';

export const validateSchema = (document, schema) => {
	const validate = new Validator();
	const validation = validate.validate(document, schema);
	if (validation.errors.length > 0) {
		console.log(validation.errors);
		throw new Error;
	}

};