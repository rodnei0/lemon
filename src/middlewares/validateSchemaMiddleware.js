import { Validator } from "jsonschema";

export const validateSchemaMiddleware = (schema) => {
    return (req, res, next) => {
        const validate = new Validator();
        const validation = validate.validate(req.body, schema);
        if (validation.errors.length > 0) {
            return res.status(400).send({ error: "Schema inválido!", errors: validation.errors[0].message });
        }

        next();
    }
}