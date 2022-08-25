import { Router } from 'express';
import isEligibleRouter from './isElegibleRouter.js';

const router = Router();

router.use(isEligibleRouter);

export default router;