import {
  updateTransactionById,
  deleteTransactionById,
} from '../services/transaction.js';
import createHttpError from 'http-errors';
import { Transaction } from '../models/transaction.js';
import { Category } from '../models/category.js';

export const createTransaction = async (req, res, next) => {
  try {
    const { category: categoryName, ...rest } = req.body;

    // Знайти категорію за ім'ям
    const categoryDoc = await Category.findOne({ name: categoryName });
    if (!categoryDoc) {
      throw createHttpError(400, 'Invalid category');
    }

    // Валідація відповідності типу транзакції і категорії
    const { type } = req.body;

    if (type === 'income' && categoryDoc.name !== 'Incomes') {
      throw createHttpError(
        400,
        'Для доходів можна використовувати тільки категорію "Incomes"',
      );
    }

    if (type === 'expense' && categoryDoc.name === 'Incomes') {
      throw createHttpError(
        400,
        'Категорія "Incomes" може використовуватись тільки для доходів',
      );
    }

    // Створити транзакцію
    const transaction = await Transaction.create({
      ...rest,
      category: categoryDoc._id,
      userId: req.user._id,
    });

    // Повернути з populate
    const populatedTransaction = await Transaction.findById(
      transaction._id,
    ).populate('category', 'name type');

    res.status(201).json(populatedTransaction);
  } catch (error) {
    next(error);
  }
};

export const getAllTransactions = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const transactions = await Transaction.find({ userId })
      .populate('category', 'name type')
      .sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user._id;

    // Якщо оновлюється category (передається ім'я), конвертуємо в ID
    if (req.body.category) {
      const categoryDoc = await Category.findOne({ name: req.body.category });
      if (!categoryDoc) {
        throw createHttpError(400, 'Invalid category');
      }
      req.body.category = categoryDoc._id;
    }

    const updated = await updateTransactionById(
      transactionId,
      userId,
      req.body,
    );

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user._id;

    await deleteTransactionById(transactionId, userId);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
