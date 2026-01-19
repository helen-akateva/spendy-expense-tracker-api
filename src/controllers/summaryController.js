import { getSummaryForMonth } from '../services/summary.js';

export const getMonthlySummary = async (req, res) => {
  try {
    const { period } = req.params;
    const userId = req.user._id;
    const summary = await getSummaryForMonth(period, userId);

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
