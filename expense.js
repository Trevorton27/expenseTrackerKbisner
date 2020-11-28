const expenseArray = JSON.parse(localStorage.getItem('allExpenses')) || [];

const dataButton = document.getElementById('data-button');
const inputDate = document.getElementById('date');
const inputType = document.getElementById('type');
const inputMerchant = document.getElementById('merchant');
const inputAmount = document.getElementById('amount');
const expenseTable = document.getElementById('expense-table');
const expenseInputContainer = document.getElementById(
  'expense-input-container'
);
const elementTableToClear = document.getElementById('expense-table');
const form = document.getElementById('form');

window.addEventListener('load', updateTable);

function updateTable() {
  expenseArray.forEach((savedExpense) => {
    displayData(savedExpense);
  });
}

dataButton.addEventListener('click', validateData);

function pushExpense() {
  const newExpenseItem = {
    id: Math.random(),
    date: inputDate.value,
    paymentType: inputType.value,
    merchant: inputMerchant.value,
    amount: inputAmount.value
  };

  pushDataToArray(newExpenseItem);
  saveRawData(newExpenseItem);
  //clearTableDisplay();
  //getRawData();
  displayData(newExpenseItem);
  form.reset();
}

function pushDataToArray(newExpenseItem) {
  expenseArray.push(newExpenseItem);
}
function validateData() {
  const dataErrorMessage = document.createElement('p');

  if (document.getElementById('data-error-message')) {
    document.getElementById('data-error-message').remove();
  }

  if (
    inputDate.value === '' ||
    inputMerchant.value === '' ||
    inputAmount.value === ''
  ) {
    dataErrorMessage.setAttribute('id', 'data-error-message');
    dataErrorMessage.appendChild(
      document.createTextNode('You must enter all fields to continue!')
    );
    expenseInputContainer.appendChild(dataErrorMessage);
    return;
  }
  pushExpense();
}

function saveRawData() {
  localStorage.setItem('allExpenses', JSON.stringify(expenseArray));
}

function displayData(newExpenseItem) {
  const rowId = newExpenseItem.id;
  const newTableRow = document.createElement('tr');
  newTableRow.setAttribute('id', rowId);

  const tableRowDate = document.createElement('td');
  tableRowDate.setAttribute('id', 'expenseItemDate');

  const tableRowPaymentType = document.createElement('td');
  tableRowPaymentType.setAttribute('id', 'expenseItemType');

  const tableRowMerchant = document.createElement('td');
  tableRowMerchant.setAttribute('id', 'expenseItemMerchant');

  const tableRowAmount = document.createElement('td');
  tableRowAmount.setAttribute('id', 'expenseItemAmount');

  const tableRowDelete = document.createElement('td');

  const newTableDataDeleteImg = document.createElement('img');
  newTableDataDeleteImg.setAttribute('id', 'task-delete-img');
  newTableDataDeleteImg.setAttribute('src', 'images/redx.png');
  newTableDataDeleteImg.setAttribute('alt', 'red brushstroke x');
  tableRowDelete.appendChild(newTableDataDeleteImg);
  tableRowDelete.setAttribute('id', 'task-delete');

  expenseTable.appendChild(newTableRow);

  newTableRow.appendChild(tableRowDate);
  newTableRow.appendChild(tableRowPaymentType);
  newTableRow.appendChild(tableRowMerchant);
  newTableRow.appendChild(tableRowAmount);
  newTableRow.appendChild(tableRowDelete);

  tableRowDate.textContent = newExpenseItem.date;
  tableRowPaymentType.textContent = newExpenseItem.paymentType;
  tableRowMerchant.textContent = newExpenseItem.merchant;
  tableRowAmount.textContent = newExpenseItem.amount;

  const deleteButton = document.getElementById('task-delete');
  deleteButton.addEventListener('click', deleteExpense);
}

function deleteExpense(e) {
  e.preventDefault();
  console.log(e.target.parentNode.id);
  let rowId = e.target.parentNode.id;
  for (let i = 0; i < expenseArray.length; i++) {
    if (expenseArray[i].id === rowId) {
      expenseArray.splice(i, 1);
      rowId.parentNode.removeChild(rowId);
      saveRawData();
    }
  }
}
