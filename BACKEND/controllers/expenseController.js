import expenseModel from '../models/expenseModel.js';

export const addExpense = async (req, res) => {
  try {
    const { category, title, date, amount, paymentMethod, description } = req.body;

    if (!category || !title || !date || !amount || !paymentMethod) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const newExpense = new expenseModel({
      category,
      title,
      date,
      amount,
      paymentMethod,
      description,
    });

    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Failed to add expense', error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find();
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await expenseModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ message: 'Failed to update expense', error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await expenseModel.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Failed to delete expense', error: error.message });
  }
};