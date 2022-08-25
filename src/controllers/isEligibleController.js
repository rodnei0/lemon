import { isClientEligible } from '../services/isEligibleService.js';

export const isEligible = (req, res) => {
	const document = req.body;

	const result = isClientEligible(document);

	res.status(200).send(result);
};