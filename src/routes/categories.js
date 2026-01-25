import { Router } from 'express';
import { getCategories } from '../controllers/categoriesController.js';

const categoriesRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints for retrieving income and expense categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get list of available categories
 *     tags: [Categories]
 *     security:
 *       - cookieAuth: []
 *     description: Returns two arrays — income categories and expense categories
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 incomes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: MongoDB ObjectId of the category
 *                         example: "6969fa24a24573a2ab69c339"
 *                       name:
 *                         type: string
 *                         example: "Incomes"
 *                       type:
 *                         type: string
 *                         example: "income"
 *                 expenses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: MongoDB ObjectId of the category
 *                         example: "6969fa24a24573a2ab69c33a"
 *                       name:
 *                         type: string
 *                         example: "Products"
 *                       type:
 *                         type: string
 *                         example: "expense"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch categories"
 */
categoriesRoutes.get('/categories', getCategories);

export default categoriesRoutes;
