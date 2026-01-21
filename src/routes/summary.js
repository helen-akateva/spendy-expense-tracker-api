import { Router } from 'express';
import { celebrate } from 'celebrate';
import { summaryPeriodValidator } from '../validations/summaryValidation.js';
import { getMonthlySummary } from '../controllers/summaryController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Summary
 *   description: Endpoints for financial summary and reports
 */

/**
 * @swagger
 * /summary/{period}:
 *   get:
 *     summary: Get monthly financial summary
 *     tags: [Summary]
 *     description: Returns total income, expenses by category, and overall totals for the specified month
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: period
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}$'
 *         description: Period in format YYYY-MM (e.g. 2025-01)
 *         example: "2025-01"
 *     responses:
 *       200:
 *         description: Monthly summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 income:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 4500.75
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: string
 *                             example: "Incomes"
 *                           amount:
 *                             type: number
 *                             example: 4500.75
 *                 expense:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 1820.50
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: string
 *                             example: "Products"
 *                           amount:
 *                             type: number
 *                             example: 320.00
 *       400:
 *         description: Invalid period format (should be YYYY-MM)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid period format. Expected YYYY-MM"
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get(
  '/summary/:period',
  authenticate,
  celebrate(summaryPeriodValidator),
  getMonthlySummary,
);

export default router;
