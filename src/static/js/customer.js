// Sample customer data
const customers = [
  {
    id: "CUST-1001",
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    joined: "2023-01-15",
    orders: 5,
    status: "active",
    type: "premium",
  },
  {
    id: "CUST-1002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(555) 987-6543",
    joined: "2023-02-20",
    orders: 2,
    status: "active",
    type: "regular",
  },
  {
    id: "CUST-1003",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "(555) 456-7890",
    joined: "2023-03-10",
    orders: 8,
    status: "inactive",
    type: "regular",
  },
];

// DOM Elements
const customersTableBody = document.getElementById("customers-table-body");
const customerFilter = document.getElementById("customer-filter");
const customerModal = document.getElementById("customer-modal");
const customerForm = document.getElementById("customer-form");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderCustomers();
  setupEventListeners();
});

// Render customers table
function renderCustomers(filter = "all") {
  customersTableBody.innerHTML = "";

  const filteredCustomers =
    filter === "all"
      ? customers
      : customers.filter((c) =>
          filter === "premium" ? c.type === "premium" : c.status === filter,
        );

  filteredCustomers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.joined}</td>
            <td>${customer.orders}</td>
            <td>
                <span class="status-badge ${customer.status === "active" ? "status-active" : "status-inactive"}">
                    ${customer.status === "active" ? "Active" : "Inactive"}
                </span>
                ${customer.type === "premium" ? '<span class="status-badge status-premium">Premium</span>' : ""}
            </td>
            <td>
                <button class="btn btn-outline btn-sm edit-customer" data-id="${customer.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline btn-sm delete-customer" data-id="${customer.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
    customersTableBody.appendChild(row);
  });
}

// Event listeners
function setupEventListeners() {
  // Filter customers
  customerFilter.addEventListener("change", (e) => {
    renderCustomers(e.target.value);
  });

  // Add customer button
  document.getElementById("add-customer").addEventListener("click", () => {
    document.getElementById("modal-title").textContent = "Add New Customer";
    customerForm.reset();
    customerModal.style.display = "block";
  });

  // Close modal
  document.querySelector(".close-modal").addEventListener("click", () => {
    customerModal.style.display = "none";
  });

  // Cancel button
  document.getElementById("cancel-customer").addEventListener("click", () => {
    customerModal.style.display = "none";
  });

  // Form submission
  customerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Save customer logic would go here
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
  const customer = customers.find((c) => c.id === id);
  if (customer) {
    document.getElementById("modal-title").textContent = "Edit Customer";
    document.getElementById("customer-id").value = customer.id;
    document.getElementById("customer-name").value = customer.name;
    document.getElementById("customer-email").value = customer.email;
    document.getElementById("customer-phone").value = customer.phone;
    document.getElementById("customer-status").value = customer.status;
    document.getElementById("customer-type").value = customer.type;
    customerModal.style.display = "block";
  }
}

function deleteCustomer(id) {
  console.log(`Deleting customer ${id}`);
  // In a real app, you would make an API call here
  alert("Customer deleted successfully!");
  renderCustomers(customerFilter.value);
}
