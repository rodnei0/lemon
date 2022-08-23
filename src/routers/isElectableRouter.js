import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { isElectable} from '../controllers/isElectableController.js';
import { input, output } from "../schemas/inputOutputSchema.js";

const isElectableRouter = Router();

isElectableRouter.post('/iselectable', validateSchemaMiddleware(input), isElectable);

export default isElectableRouter;