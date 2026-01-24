import { Transaction } from '../models/transaction.js';
import { User } from '../models/user.js';

export const getCurrentUser = async (req, res, next) => {
  try {
    const userObject = req.user.toObject ? req.user.toObject() : req.user;
    delete userObject.password;

    res.status(200).json(userObject);
  } catch (error) {
    next(error);
  }
};

export const recalculateBalance = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get all user transactions
    const transactions = await Transaction.find({ userId });

    // Calculate total balance from all transactions
    let balance = 0;
    for (const transaction of transactions) {
      if (transaction.type === 'income') {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    }

    // Update user balance
    await User.findByIdAndUpdate(userId, { balance });

    const updatedUser = await User.findById(userId);
    res.json({
      message: 'Balance recalculated successfully',
      balance: updatedUser.balance,
      transactionsCount: transactions.length,
    });
  } catch (error) {
    next(error);
  }
};
