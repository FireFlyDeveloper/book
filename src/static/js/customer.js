// Sample customer data
let customers;

async function deleteCustomer(id) {
  try {
    const response = await fetch(`/api/delete-user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const deletedCustomer = await response.json();
    console.log("Customer deleted:", deletedCustomer);
    // Refresh customer data after deletion
    customers = await fetchCustomers();
    renderCustomers();
    alert("Customer deleted successfully!");
  } catch (error) {
    console.error("Error deleting customer:", error);
  }
}

async function updateCustomer(id, name, email) {
  try {
    const response = await fetch(`/api/update-user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const updatedCustomer = await response.json();
    // Refresh customer data after update
    customers = await fetchCustomers();
    renderCustomers();
  } catch (error) {
    console.error("Error updating customer:", error);
  }
}

async function fetchCustomers() {
  try {
    const response = await fetch("/api/list-user");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return []; // Return empty array if fetch fails
  }
}

// DOM Elements
const customersTableBody = document.getElementById("customers-table-body");
const customerFilter = document.getElementById("customer-filter");
const customerModal = document.getElementById("customer-modal");
const customerForm = document.getElementById("customer-form");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  fetchCustomers().then((data) => {
    customers = data;
    renderCustomers();
    setupEventListeners();
  });
});

// Render customers table
function renderCustomers(filter = "all") {
  customersTableBody.innerHTML = "";
  const filteredCustomers = customers;

  filteredCustomers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td>${customer.xata_id}</td>
              <td>${customer.name}</td>
              <td>${customer.email}</td>
              <td>${customer.phone}</td>
              <td>${new Date(customer.xata_createdat)}</td>
              <td>
                  <button class="btn btn-outline btn-sm edit-customer" data-id="${customer.xata_id}">
                      <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-outline btn-sm delete-customer" data-id="${customer.xata_id}">
                      <i class="fas fa-trash"></i>
                  </button>
              </td>
          `;
    customersTableBody.appendChild(row);
  });
}

// Event listeners
function setupEventListeners() {
  // Close modal
  document.querySelector(".close-modal").addEventListener("click", () => {
    customerModal.style.display = "none";
  });

  // Cancel button
  document.getElementById("cancel-customer").addEventListener("click", () => {
    customerModal.style.display = "none";
  });

  // Form submission
  customerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("customer-id").value;
    const name = document.getElementById("customer-name").value;
    const email = document.getElementById("customer-email").value;
    await updateCustomer(id, name, email);
    alert("Customer saved successfully!");
    customerModal.style.display = "none";
  });

  // Edit/Delete buttons (event delegation)
  customersTableBody.addEventListener("click", (e) => {
    if (e.target.closest(".edit-customer")) {
      const customerId = e.target.closest(".edit-customer").dataset.id;
      editCustomer(customerId);
    } else if (e.target.closest(".delete-customer")) {
      const customerId = e.target.closest(".delete-customer").dataset.id;
      if (confirm("Are you sure you want to delete this customer?")) {
        deleteCustomer(customerId);
      }
    }
  });
}

function editCustomer(id) {
  const customer = customers.find((c) => c.xata_id === id);
  if (customer) {
    document.getElementById("modal-title").textContent = "Edit Customer";
    document.getElementById("customer-id").value = customer.xata_id;
    document.getElementById("customer-name").value = customer.name;
    document.getElementById("customer-email").value = customer.email;
    document.getElementById("customer-phone").value = customer.phone;
    customerModal.style.display = "block";
  }
}
