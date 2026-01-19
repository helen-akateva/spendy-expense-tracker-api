import { Router } from 'express';
import { celebrate } from 'celebrate';
import { summaryPeriodValidator } from '../validations/summaryValidation.js';
import { getMonthlySummary } from '../controllers/summaryController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get(
  '/summary/:period',
  authenticate,
  celebrate(summaryPeriodValidator),
  getMonthlySummary,
);

export default router;
