// declare variables
const inputBudget = document.getElementById("budgetInput");
const budgetBtn = document.getElementById("budgetBtn");
const expenseInputTitle = document.getElementById("expenseTitleInput");
const expenseAmountInput = document.getElementById("expenseAmountInput");
const expenseBtn = document.getElementById("expenseBtn");
const resetBtn = document.getElementById("resetBtn");
const totalBudgetDisplay = document.getElementById("totalBudgetDisplay");
const totalExpenseDisplay = document.getElementById("totalExpenseDisplay");
const budgetLeftDisplay = document.getElementById("budgetLeftDisplay");
const expenseList = document.getElementById("historyList");

//Add EventListener
//card 1
budgetBtn.addEventListener("click", () => {
  localStorage.setItem("inputBud", inputBudget.value);
  totalBudgetDisplay.innerText = "$" + Number(inputBudget.value);
  inputBudget.value = "";
  showItems();
});
//card2
expenseBtn.addEventListener("click", () => {
  expenses.push({
    title: expenseInputTitle.value,
    amount: Number(expenseAmountInput.value)
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));
  showItems();
  expenseInputTitle.value = "";
  expenseAmountInput.value = "";
});
//reset button
resetBtn.addEventListener("click", () => {
  totalBudgetDisplay.textContent = "$0";
  localStorage.clear();
  showItems();
  location.reload();
});

//creating a Functions
//on reload the value on the total budget is not go
const savedValue = localStorage.getItem("inputBud");
if (savedValue) {
  totalBudgetDisplay.textContent = "$" + savedValue;
}
//Displaying the items of localStorage in ul display
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
function showItems() {
  let totalExpense = 0;
  expenseList.innerHTML = "";
  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${expense.title}</b> <b>$${expense.amount}</b>`;

    // delete button
    const delBtn = document.createElement("button");
    delBtn.classList.add("deleteBtn");
    delBtn.textContent = "remove";
    delBtn.addEventListener("click", () => {
      expenses.splice(index, 1); // remove this item
      localStorage.setItem("expenses", JSON.stringify(expenses)); // save
      showItems(); // redraw
    });

    li.appendChild(delBtn);
    expenseList.appendChild(li);
    totalExpense += expense.amount;
  });

  totalExpenseDisplay.innerText = "$" + totalExpense;

  let totalBudget = JSON.parse(localStorage.getItem("inputBud")) || [];
  budgetLeftDisplay.innerText = "$" + (totalBudget - totalExpense);
}
showItems();
