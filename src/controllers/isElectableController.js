import { isClientElectable } from '../services/isElectableService.js';

export const isElectable = (req, res) => {
	const document = req.body;

	const result = isClientElectable(document);

	res.status(200).send(result);
};