import { Transaction } from '../models/transaction.js';
import { User } from '../models/user.js';
import {
  deleteTransactionById,
  updateTransactionById,
} from '../services/transaction.js';

import { validateTransactionCategoryMatch } from '../services/transaction.js';

export const createTransaction = async (req, res, next) => {
  try {
    const { type, categoryId, amount, date, comment } = req.body;
    const userId = req.user._id;

    await validateTransactionCategoryMatch(type, categoryId);

    const transaction = await Transaction.create({
      type,
      category: categoryId,
      amount,
      date,
      comment: comment?.trim() || '',
      userId,
    });

    // 🔥 ОНОВЛЮЄМО БАЛАНС
    const balanceChange = type === 'income' ? amount : -amount;

    await User.findByIdAndUpdate(userId, {
      $inc: { balance: balanceChange },
    });

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

    res.json({ transactions });
  } catch (error) {
    next(error);
  }
};
export const updateTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user._id;

    const { categoryId, ...rest } = req.body;

    const updateData = { ...rest };
    if (categoryId) updateData.category = categoryId;

    console.log('🔍 UPDATE REQUEST:', { transactionId, updateData });

    const { oldTransaction, updatedTransaction } = await updateTransactionById(
      transactionId,
      userId,
      updateData,
    );

    console.log('📊 OLD TRANSACTION:', {
      type: oldTransaction.type,
      amount: oldTransaction.amount,
    });
    console.log('📊 NEW TRANSACTION:', {
      type: updatedTransaction.type,
      amount: updatedTransaction.amount,
    });

    // баланс ДО
    const oldValue =
      oldTransaction.type === 'income'
        ? oldTransaction.amount
        : -oldTransaction.amount;

    // баланс ПІСЛЯ
    const newValue =
      updatedTransaction.type === 'income'
        ? updatedTransaction.amount
        : -updatedTransaction.amount;

    // різниця
    const balanceChange = newValue - oldValue;

    console.log('💰 BALANCE CALCULATION:', {
      oldValue,
      newValue,
      balanceChange,
      userId: userId.toString(),
    });

    await User.findByIdAndUpdate(userId, {
      $inc: { balance: balanceChange },
    });

    console.log('✅ Balance updated successfully');

    res.json(updatedTransaction);
  } catch (err) {
    console.error('❌ UPDATE ERROR:', err);
    next(err);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user._id;

    const deleted = await deleteTransactionById(transactionId, userId);

    const balanceChange =
      deleted.type === 'income' ? -deleted.amount : deleted.amount;

    await User.findByIdAndUpdate(userId, {
      $inc: { balance: balanceChange },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
