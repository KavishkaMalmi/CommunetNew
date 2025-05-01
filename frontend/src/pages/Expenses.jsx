import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]); // For search functionality
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    date: '',
    amount: '',
    paymentMethod: '',
    description: '',
  });
  const [editExpenseId, setEditExpenseId] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expense/get-expenses');
      setExpenses(response.data);
      setFilteredExpenses(response.data); // Initialize filtered expenses
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = expenses.filter((expense) =>
      Object.values(expense).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
    setFilteredExpenses(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editExpenseId) {
        await axios.put(`http://localhost:5000/api/expense/update-expense/${editExpenseId}`, formData);
        setEditExpenseId(null);
      } else {
        await axios.post('http://localhost:5000/api/expense/add-expense', formData);
      }
      fetchExpenses();
      setFormData({
        category: '',
        title: '',
        date: '',
        amount: '',
        paymentMethod: '',
        description: '',
      });
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const handleEdit = (expense) => {
    setEditExpenseId(expense._id);
    setFormData({
      category: expense.category,
      title: expense.title,
      date: expense.date.split('T')[0],
      amount: expense.amount,
      paymentMethod: expense.paymentMethod,
      description: expense.description,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`http://localhost:5000/api/expense/delete-expense/${id}`);
        fetchExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  // Calculate total expenses
  const totalExpenses = filteredExpenses.reduce(
    (total, expense) => total + parseFloat(expense.amount || 0),
    0
  );

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Expense Report', 14, 10);

    const tableColumn = ['Category', 'Title', 'Date', 'Amount', 'Payment Method', 'Description'];
    const tableRows = filteredExpenses.map((expense) => [
      expense.category,
      expense.title,
      expense.date.split('T')[0],
      `₹${expense.amount}`,
      expense.paymentMethod,
      expense.description,
    ]);

    tableRows.push(['', '', '', `Total: ₹${totalExpenses.toFixed(2)}`, '', '']);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('Expense_Report.pdf');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Expense Management</h1>

      {/* Total Expenses */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Total Expenses</h2>
        <p className="text-2xl font-bold text-sky-950">Rs.{totalExpenses.toFixed(2)}</p>
      </div>

      {/* Expense Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editExpenseId ? 'Edit Expense' : 'Add Expense'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Category</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Housing">Housing</option>
              <option value="Utilities">Utilities</option>
              <option value="Groceries & Household Supplies">Groceries & Household Supplies</option>
              <option value="Transportation">Transportation</option>
              <option value="Health & Medical">Health & Medical</option>
              <option value="Dining & Entertainment">Dining & Entertainment</option>
              <option value="Home Improvement & Furnishings">Home Improvement & Furnishings</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              onKeyPress={(e) => {
                const regex = /^[a-zA-Z\s]*$/; // Allow only letters and spaces
                if (!regex.test(e.key)) {
                  e.preventDefault(); // Prevent invalid characters
                }
              }}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              onFocus={(e) => e.target.showPicker()} // Open the date picker on focus
              max={new Date().toISOString().split('T')[0]} // Set max to today's date
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Amount</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              onKeyPress={(e) => {
                const regex = /^[0-9]*$/; // Allow only numbers
                if (!regex.test(e.key)) {
                  e.preventDefault(); // Prevent invalid characters
                }
              }}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Payment Method</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              required
            >
              <option value="" disabled>Select a payment method</option>
              <option value="Cash">Cash</option>
              <option value="Card Payment">Card Payment</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-sky-950 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {editExpenseId ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>

      {/* Expense List */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Expense List</h2>
      {/* Search Bar and Download PDF Button */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Download PDF Button */}
        <button
          onClick={generatePDF}
          className="bg-sky-950 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Download PDF
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Payment Method</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{expense.category}</td>
              <td className="border border-gray-300 px-4 py-2">{expense.title}</td>
              <td className="border border-gray-300 px-4 py-2">{expense.date.split('T')[0]}</td>
              <td className="border border-gray-300 px-4 py-2">{expense.amount}</td>
              <td className="border border-gray-300 px-4 py-2">{expense.paymentMethod}</td>
              <td className="border border-gray-300 px-4 py-2">{expense.description}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    className="bg-sky-950 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleDelete(expense._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;