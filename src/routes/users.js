import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { getCurrentUser, recalculateBalance } from '../controllers/users.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints for managing current user information
 */

/**
 * @swagger
 * /current:
 *   get:
 *     summary: Get information about the currently authenticated user
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     description: Returns profile data of the logged-in user (without sensitive fields like password)
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64f8b123456789abcdef0123"
 *                 username:
 *                   type: string
 *                   example: "john_doe"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 balance:
 *                   type: number
 *                   example: 1250.75
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-15T10:30:00.000Z"
 *       401:
 *         description: Unauthorized - invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication required"
 *       404:
 *         description: User not found (should be rare with valid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 */
router.get('/current', authenticate, getCurrentUser);

/**
 * @swagger
 * /recalculate-balance:
 *   post:
 *     summary: Recalculate user balance from all transactions
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     description: Recalculates the user's balance by summing all income and expense transactions. Useful for fixing incorrect balances.
 *     responses:
 *       200:
 *         description: Balance recalculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Balance recalculated successfully"
 *                 balance:
 *                   type: number
 *                   example: 1250.75
 *                 transactionsCount:
 *                   type: number
 *                   example: 15
 *       401:
 *         description: Unauthorized - invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
router.post('/recalculate-balance', authenticate, recalculateBalance);

export default router;
