import { Router } from 'express';
import isEligibleRouter from './isElegibleRouter';

const router = Router();

router.use(isEligibleRouter);

export default router;