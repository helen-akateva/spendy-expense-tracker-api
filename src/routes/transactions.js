import {
  updateTransactionById,
  deleteTransactionById,
} from '../services/transaction.js';
import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createTransactionSchema,
  getAllTransactionsSchema,
} from '../validations/transactionValidation.js';
import {
  createTransaction,
  getAllTransactions,
} from '../controllers/transactionsController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.post(
  '/',
  celebrate(createTransactionSchema),
  authenticate,
  createTransaction,
);

router.get(
  '/all',
  celebrate(getAllTransactionsSchema),
  authenticate,
  getAllTransactions,
);

export default router;


export const updateTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user._id;

    const updated = await updateTransactionById(
      transactionId,
      userId,
      req.body,
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user._id;

    await deleteTransactionById(transactionId, userId);

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message });
  }
};

