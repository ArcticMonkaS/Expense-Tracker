const expenseForm = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses');
const chartCanvas = document.getElementById('expense-chart');
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const updateChart = () => {
  const categories = ['Food', 'Travel', 'Utilities', 'Other'];
  const totals = categories.map((category) =>
    expenses
      .filter((expense) => expense.type === category.toLowerCase())
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  new Chart(chartCanvas, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [
        {
          data: totals,
          backgroundColor: ['#f39c12', '#2ecc71', '#3498db', '#9b59b6'],
        },
      ],
    },
  });
};

const renderExpenses = () => {
  expensesList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.type}</td>
      <td>$${expense.amount.toFixed(2)}</td>
      <td>${expense.description || '-'}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">
          Delete
        </button>
      </td>
    `;
    expensesList.appendChild(row);
  });
  updateChart();
};

const deleteExpense = (index) => {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
};

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const type = document.getElementById('type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const description = document.getElementById('description').value;

  expenses.push({ date, type, amount, description });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();

  expenseForm.reset();
});

// Initial Render
renderExpenses();
