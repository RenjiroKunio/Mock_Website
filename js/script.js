// ===============================
// NAVARA - script.js
// Beginner-Friendly JavaScript
// ===============================

// -----------------------------------
// CREATE MODAL ELEMENT
// -----------------------------------

const modalHTML = `
<div 
  id="expenseModal" 
  class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50"
>

  <div class="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">

    <div class="flex items-center justify-between mb-6">

      <h2 class="text-2xl font-bold text-gray-800">
        Add Expense
      </h2>

      <button 
        id="closeModalBtn"
        class="text-gray-500 hover:text-black text-2xl"
      >
        ×
      </button>

    </div>

    <!-- FORM -->
    <form id="expenseForm" class="space-y-5">

      <!-- TITLE -->
      <div>

        <label class="block text-sm font-medium text-gray-700 mb-2">
          Expense Title
        </label>

        <input
          type="text"
          id="expenseTitle"
          required
          placeholder="Hotel Booking"
          class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <!-- CATEGORY -->
      <div>

        <label class="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>

        <select
          id="expenseCategory"
          class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

          <option>Food</option>
          <option>Transport</option>
          <option>Accommodation</option>
          <option>Entertainment</option>

        </select>

      </div>

      <!-- AMOUNT -->
      <div>

        <label class="block text-sm font-medium text-gray-700 mb-2">
          Amount
        </label>

        <input
          type="number"
          id="expenseAmount"
          required
          placeholder="100"
          class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <!-- BUTTON -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Add Expense
      </button>

    </form>

  </div>

</div>
`;

document.body.insertAdjacentHTML("beforeend", modalHTML);

// -----------------------------------
// CREATE NOTIFICATION ELEMENT
// -----------------------------------

const notificationHTML = `
<div
  id="notification"
  class="fixed top-6 right-6 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl hidden z-50"
>
  Expense Added Successfully!
</div>
`;

document.body.insertAdjacentHTML("beforeend", notificationHTML);

// -----------------------------------
// GET ELEMENTS
// -----------------------------------

const modal = document.getElementById("expenseModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const expenseForm = document.getElementById("expenseForm");
const notification = document.getElementById("notification");

// -----------------------------------
// FIND ALL ADD EXPENSE BUTTONS
// -----------------------------------

const addExpenseButtons = document.querySelectorAll("button");

// -----------------------------------
// OPEN MODAL
// -----------------------------------

addExpenseButtons.forEach((button) => {

  if (button.textContent.includes("Add Expense")) {

    button.addEventListener("click", () => {

      modal.classList.remove("hidden");
      modal.classList.add("flex");

    });

  }

});

// -----------------------------------
// CLOSE MODAL
// -----------------------------------

closeModalBtn.addEventListener("click", () => {

  modal.classList.add("hidden");
  modal.classList.remove("flex");

});

// CLOSE WHEN CLICKING OUTSIDE
modal.addEventListener("click", (event) => {

  if (event.target === modal) {

    modal.classList.add("hidden");
    modal.classList.remove("flex");

  }

});

// -----------------------------------
// HANDLE FORM SUBMISSION
// -----------------------------------

expenseForm.addEventListener("submit", (event) => {

  event.preventDefault();

  // GET FORM VALUES
  const title = document.getElementById("expenseTitle").value;
  const category = document.getElementById("expenseCategory").value;
  const amount = parseFloat(
    document.getElementById("expenseAmount").value
  );

  // -----------------------------------
  // FIND TABLE BODY
  // -----------------------------------

  const tableBody = document.querySelector("tbody");

  // -----------------------------------
  // CREATE NEW ROW
  // -----------------------------------

  const newRow = `
    <tr class="border-b hover:bg-gray-50">

      <td class="py-5 font-medium">
        ${title}
      </td>

      <td class="py-5">
        ${category}
      </td>

      <td class="py-5">
        You
      </td>

      <td class="py-5">
        Today
      </td>

      <td class="py-5 font-semibold">
        $${amount}
      </td>

      <td class="py-5">

        <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Completed
        </span>

      </td>

    </tr>
  `;

  // ADD ROW TO TABLE
  if (tableBody) {

    tableBody.insertAdjacentHTML("afterbegin", newRow);

  }

  // -----------------------------------
  // UPDATE TOTAL EXPENSES
  // -----------------------------------

  updateExpenseTotals(amount);

  // -----------------------------------
  // SHOW NOTIFICATION
  // -----------------------------------

  showNotification();

  // -----------------------------------
  // RESET FORM
  // -----------------------------------

  expenseForm.reset();

  // -----------------------------------
  // CLOSE MODAL
  // -----------------------------------

  modal.classList.add("hidden");
  modal.classList.remove("flex");

});

// -----------------------------------
// UPDATE TOTALS FUNCTION
// -----------------------------------

function updateExpenseTotals(newAmount) {

  // FIND ALL BIG NUMBER HEADINGS
  const statNumbers = document.querySelectorAll("h1");

  statNumbers.forEach((numberElement) => {

    const text = numberElement.textContent;

    // CHECK IF IT CONTAINS $
    if (text.includes("$")) {

      // REMOVE SYMBOLS
      let currentValue = text.replace("$", "").replace(",", "");

      currentValue = parseFloat(currentValue);

      // SKIP INVALID VALUES
      if (!isNaN(currentValue)) {

        // UPDATE NUMBER
        const updatedValue = currentValue + newAmount;

        // FORMAT NUMBER
        numberElement.textContent =
          "$" + updatedValue.toLocaleString();

        // ONLY UPDATE FIRST MATCH
        return;

      }

    }

  });

}

// -----------------------------------
// SHOW NOTIFICATION FUNCTION
// -----------------------------------

function showNotification() {

  notification.classList.remove("hidden");

  setTimeout(() => {

    notification.classList.add("hidden");

  }, 3000);

}

// -----------------------------------
// SIMPLE PAGE LOAD ANIMATION
// -----------------------------------

window.addEventListener("load", () => {

  document.body.classList.add("opacity-100");

});

// -----------------------------------
// OPTIONAL CONSOLE MESSAGE
// -----------------------------------

console.log("NAVARA script.js loaded successfully!");