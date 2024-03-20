const expenseForm = document.getElementById("expense-form");

const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

//Local storge

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


//funtion to show expenses in tabular form

function show() {

    //clear expense List
    expenseList.innerHTML = "";

    //initialize the total amount to 0
    let totalAmount = 0;


    //Loop through the expense array and create table rows
    for (i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const expenseRow = document.createElement("tr")
        expenseRow.innerHTML =
                `<td class="desc">
        <p>${expense.name}</p>
        </td>

        <td class="amount">
        <p>${expense.amount}</p>
        </td>

        <td class="date">
        <p>${expense.date}</p>
        </td>

        <td class="category">
        <p>${expense.category}</p>
        </td>

        <td class="delete-btn" data-id="${i}">
                Delete
        </td> 

        `;

        expenseList.appendChild(expenseRow);

        //Update total amount
        totalAmount += expense.amount;

    }

    // const topThree = expenses.filter((element, index) => {
    //     return index <= 5;
    // });
    //udate total amount display
    totalAmountElement.textContent = totalAmount.toFixed(2);

    


    //Save changes to localStorage

    localStorage.setItem("expenses", JSON.stringify(expenses));
}






function addExpense(event) {
    event.preventDefault();

    //get expense name,amount,date and category from the form

    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseDateInput = document.getElementById("expense-date");
    const expenseCategoryInput = document.getElementById("expense-category");

    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);
    const expenseDate = expenseDateInput.value;
    const expenseCategory = expenseCategoryInput.value;


    //Clear form inputs
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
    expenseDateInput.value = "";
    expenseCategoryInput.value = "";

    //Validations

    if (expenseName === "" || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("please enter  valid expense details");
        return;

    }


    //create new expense object

    const expense = {
        name: expenseName,
        amount: expenseAmount,
        date: expenseDate,
        category: expenseCategory
    };

    //add expenses to expense array

    expenses.push(expense)

    //show expenses

    show();
}


function deleteExpense(Event) {
    if (Event.target.classList.contains("delete-btn")) {
        const expenseIndex = parseInt(Event.target.getAttribute("data-id"));
        expenses.splice(expenseIndex, 1);

        show();
    }
}





expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);

show();

