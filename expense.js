// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalExpenseDiv = document.getElementById('total-expense');
    const filterDateInput = document.getElementById('filter-date');
    const filterCategoryInput = document.getElementById('filter-category');

    let expenses = [];

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const expense = { amount, description, date };
        expenses.push(expense);
        displayExpenses(expenses);
        updateTotalExpense(expenses);
        expenseForm.reset();
    });

    filterDateInput.addEventListener('input', () => {
        const filteredExpenses = filterExpenses(expenses);
        displayExpenses(filteredExpenses);
        updateTotalExpense(filteredExpenses);
    });

    filterCategoryInput.addEventListener('input', () => {
        const filteredExpenses = filterExpenses(expenses);
        displayExpenses(filteredExpenses);
        updateTotalExpense(filteredExpenses);
    });

    function displayExpenses(expenses) {
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.description} - $${expense.amount} on ${expense.date}`;
            expenseList.appendChild(li);
        });
    }

    function filterExpenses(expenses) {
        const filterDate = filterDateInput.value;
        const filterCategory = filterCategoryInput.value.toLowerCase();
        return expenses.filter(expense => {
            const matchesDate = filterDate ? expense.date === filterDate : true;
            const matchesCategory = filterCategory ? expense.description.toLowerCase().includes(filterCategory) : true;
            return matchesDate && matchesCategory;
        });
    }

    function updateTotalExpense(expenses) {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalExpenseDiv.textContent = `Total: $${total.toFixed(2)}`;
    }
});
