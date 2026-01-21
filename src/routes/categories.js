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
 *                     type: string
 *                   example:
 *                     - "Incomes"
 *                 expenses:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "Main expenses"
 *                     - "Products"
 *                     - "Car"
 *                     - "Self care"
 *                     - "Child care"
 *                     - "Household products"
 *                     - "Education"
 *                     - "Leisure"
 *                     - "Other expenses"
 *                     - "Entertainment"
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
