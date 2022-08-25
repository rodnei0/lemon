import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { isEligible} from '../controllers/isEligibleController.js';
import { input } from '../schemas/inputOutputSchema.js';

const isEligibleRouter = Router();

isEligibleRouter.post('/iseligible', validateSchemaMiddleware(input), isEligible);

export default isEligibleRouter;