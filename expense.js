let expenseArray = [];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dataButton = document.getElementById("data-button");
const inputDate = document.getElementById("date");
const inputType = document.getElementById("type");
const inputMerchant = document.getElementById("merchant");
const inputAmount = document.getElementById("amount");
const expenseTable = document.getElementById("expense-table");
const expenseInputContainer = document.getElementById("expense-input-container");
const elementTableToClear = document.getElementById("expense-table");

dataButton.addEventListener("click", validateData);

function trackExpenses() {
  pushDataToArray();
  saveRawData();
  clearTableDisplay();
  getRawData();
}

function validateData() {
  const dataErrorMessage = document.createElement("p");
  
  if (document.getElementById("data-error-message")) {
    document.getElementById("data-error-message").remove();
  }

  if (inputDate.value === "" || inputMerchant.value === "" || inputAmount.value === "") {
    dataErrorMessage.setAttribute("id", "data-error-message");
    dataErrorMessage.appendChild(document.createTextNode("You must enter all fields to continue!"));
    expenseInputContainer.appendChild(dataErrorMessage);
    return
  }
  trackExpenses();
}


function pushDataToArray() {
  dateOfExpense = toDate(inputDate.value);
  expenseArray.push([dateOfExpense, inputType.value, inputMerchant.value, "$ " + Number(inputAmount.value).toFixed(2)]);
}

function saveRawData() {
  localStorage.clear();
  expenseArray = expenseArray.sort().reverse();
  localStorage.setItem("allExpenses", JSON.stringify(expenseArray));
  inputDate.value = "";
  inputType.value = "";
  inputMerchant.value = "";
  inputAmount.value = "";
}

function getRawData() {
  const allItemsInStorage = JSON.parse(localStorage.getItem("allExpenses")) || [];

  expenseArray = [];
  allItemsInStorage.forEach(item => {
    expenseArray.push(item);
  });

  if (expenseArray.length > 0) {
    clearTableDisplay();

    expenseArray.forEach(arr => {
      displayData(arr)
    });
  }
}

function displayData(arrayToDisplay) {
  const itemDate = arrayToDisplay[0];
  const itemType = arrayToDisplay[1];
  const itemMerchant = arrayToDisplay[2];
  const itemAmount = arrayToDisplay[3];
  const newTableRow = document.createElement("tr");
  const newTableDataDate = document.createElement("td");
  const newTableDataType = document.createElement("td");
  const newTableDataMerchant = document.createElement("td");
  const newTableDataAmount = document.createElement("td");
  const newTableDataDelete = document.createElement("td");
  const newTableDataDeleteImg = document.createElement("img");

  newTableRow.setAttribute("id", "expenseRow");

  newTableDataDate.setAttribute("id", "expenseItemDate");
  newTableDataDate.appendChild(document.createTextNode(itemDate));

  newTableDataType.setAttribute("id", "expenseItemType");
  newTableDataType.appendChild(document.createTextNode(itemType));

  newTableDataMerchant.setAttribute("id", "expenseItemMerchant");
  newTableDataMerchant.appendChild(document.createTextNode(itemMerchant));
  
  newTableDataAmount.setAttribute("id", "expenseItemAmount");
  newTableDataAmount.appendChild(document.createTextNode(itemAmount));

  newTableDataDelete.setAttribute("id", "task-delete");
  
  newTableDataDeleteImg.setAttribute("class", "task-delete-img");
  newTableDataDeleteImg.setAttribute("src", "images/redx.png");
  newTableDataDeleteImg.setAttribute("alt", "red brushstroke x");
  
  newTableDataDelete.appendChild(newTableDataDeleteImg);
  newTableRow.appendChild(newTableDataDate);
  newTableRow.appendChild(newTableDataType);
  newTableRow.appendChild(newTableDataMerchant);
  newTableRow.appendChild(newTableDataAmount);
  newTableRow.appendChild(newTableDataDelete);

  expenseTable.appendChild(newTableRow);

  createEventListener();
}

function clearTableDisplay() {
  while (elementTableToClear.firstChild) {
    elementTableToClear.removeChild(elementTableToClear.firstChild);
  }
}

function toDate(dateString) {
  const dateToSplit = dateString.split("-");
  const convertedDate = dateToSplit[1] + "-" + dateToSplit[2] + "-" + dateToSplit[0];
  return convertedDate
}

function createEventListener() {
  const deleteButton = document.getElementsByClassName("task-delete-img");

  if (deleteButton) {
    Array.from(deleteButton).forEach(element => {
      element.addEventListener("click", deleteExpense);
    });
  }
}

function deleteExpense(e) {
  const nodeNthChildToRemove = e.target.parentNode.parentNode.parentNode;
  const nthChildToRemove = countSiblings(e.target);

  nodeNthChildToRemove.removeChild(nodeNthChildToRemove.childNodes[nthChildToRemove]);
  expenseArray.splice(nthChildToRemove, 1);

  saveRawData();
}

function countSiblings(target) {

  let currentNode = target;
  let parentNodeExpenseRow = target.parentNode.parentNode;
  let previousSiblingNode = parentNodeExpenseRow.previousSibling;
  let numberOfSiblings = 0;

  while (previousSiblingNode !== null) {
    numberOfSiblings += 1;
    currentNode = previousSiblingNode;
    previousSiblingNode = previousSiblingNode.previousSibling;
  }
  return numberOfSiblings
}

getRawData();
inputDate.value = "";
inputType.value = "";
inputMerchant.value = "";
inputAmount.value = "";
