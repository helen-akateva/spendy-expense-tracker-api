import { Transaction } from '../models/transaction.js';
import { Category } from '../models/category.js';

export const validateTransactionCategoryMatch = async (type, categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    const error = new Error('Категорію не знайдено');
    error.status = 400;
    throw error;
  }

  if (type === 'income' && category.name !== 'Incomes') {
    const error = new Error(
      'Для доходів можна використовувати тільки категорію "Incomes"',
    );
    error.status = 400;
    throw error;
  }

  if (type === 'expense' && category.name === 'Incomes') {
    const error = new Error(
      'Категорія "Incomes" може використовуватись тільки для доходів',
    );
    error.status = 400;
    throw error;
  }

  return category;
};

// Оновити транзакцію
export const updateTransactionById = async (transactionId, userId, data) => {
  // 1. Шукаємо транзакцію користувача
  const existing = await Transaction.findOne({
    _id: transactionId,
    userId,
  });

  if (!existing) {
    const error = new Error(
      'Транзакцію не знайдено або вона не належить користувачу',
    );
    error.status = 404;
    throw error;
  }

  // 2. Якщо оновлюється type або categoryId — перевіряємо відповідність
  if (data.type || data.categoryId) {
    const typeToCheck = data.type ?? existing.type;
    const categoryIdToCheck = data.categoryId ?? existing.category;

    await validateTransactionCategoryMatch(typeToCheck, categoryIdToCheck);
  }

  // 3. Оновлюємо транзакцію
  const updated = await Transaction.findOneAndUpdate(
    { _id: transactionId, userId },
    data,
    {
      new: true,
      runValidators: true,
    },
  ).populate('category', 'name type');

  return updated;
};

// Видалити транзакцію
export const deleteTransactionById = async (transactionId, userId) => {
  const deleted = await Transaction.findOneAndDelete({
    _id: transactionId,
    userId,
  });

  if (!deleted) {
    const error = new Error(
      'Транзакцію не знайдено або вона не належить користувачу',
    );
    error.status = 404;
    throw error;
  }

  return deleted;
};
