import express from 'express';
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from '../controllers/expenseController.js';

const router = express.Router();

router.post('/add-expense', addExpense);
router.get('/get-expenses', getExpenses);
router.put('/update-expense/:id', updateExpense);
router.delete('/delete-expense/:id', deleteExpense);

export default router;