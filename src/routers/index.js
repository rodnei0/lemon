import { Router } from 'express';
import isElectableRouter from './isElectableRouter.js';

const router = Router();

router.use(isElectableRouter);

export default router;