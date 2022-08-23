import { Validator } from "jsonschema";

export const validateSchemaMiddleware = (schema) => {
    return (req, res, next) => {
        const validate = new Validator();
        const validation = validate.validate(req.body, schema);
        if (validation.errors.length > 0) {
            console.log(validation.errors)
            return res.status(400).send("Schema inválido!")
        }

        next();
    }
}