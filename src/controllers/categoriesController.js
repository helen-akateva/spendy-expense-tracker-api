import { Category } from '../models/category.js';

export const getCategories = async (req, res, next) => {
  try {
    // Отримати всі категорії
    const categories = await Category.find().sort({ _id: 1 });

    // Розділити на доходи та витрати
    const incomeCategories = categories
      .filter((cat) => cat.type === 'income')
      .map((cat) => cat.name);

    const expenseCategories = categories
      .filter((cat) => cat.type === 'expense')
      .map((cat) => cat.name);

    res.status(200).json({
      incomes: incomeCategories,
      expenses: expenseCategories,
    });
  } catch (error) {
    next(error);
  }
};
