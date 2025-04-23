const orders = [
  {
    id: "ORD-2023-001",
    date: "May 15, 2023",
    time: "10:30 AM",
    customer: "John Doe",
    email: "john@example.com",
    address: "123 Main St, Brgy. Central, Quezon City, NCR, ZIP 1100",
    status: "to-pay",
    items: [
      { name: "The Great Gatsby", quantity: 1, price: 12.99 },
      { name: "To Kill a Mockingbird", quantity: 2, price: 10.99 },
    ],
  },
  {
    id: "ORD-2023-004",
    date: "May 14, 2023",
    time: "9:00 AM",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    address: "321 Pine St, Brgy. North, Taguig City, NCR, ZIP 1630",
    status: "completed",
    items: [{ name: "The Catcher in the Rye", quantity: 1, price: 10.99 }],
  },
];

const ordersContainer = document.getElementById("orders-container");
const tabButtons = document.querySelectorAll(".tab-btn");

document.addEventListener("DOMContentLoaded", () => {
  renderOrders("to-pay");
  setupEventListeners();
});

function renderOrders(status) {
  ordersContainer.innerHTML = "";

  const filteredOrders =
    status === "all"
      ? orders
      : orders.filter((order) => order.status === status);

  if (filteredOrders.length === 0) {
    ordersContainer.innerHTML = "<p>No orders found</p>";
    return;
  }

  filteredOrders.forEach((order) => {
    const orderCard = createOrderCard(order);
    ordersContainer.appendChild(orderCard);
  });
}

function createOrderCard(order) {
  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const card = document.createElement("div");
  card.className = "order-card";
  card.dataset.orderId = order.id;

  let statusBadge = `<span class="status-badge status-${order.status}">${order.status.replace("-", " ")}</span>`;
  let actionButton = "";
  let cancelButton = "";

  switch (order.status) {
    case "to-pay":
      actionButton =
        '<button class="btn btn-primary mark-next">Mark as Paid</button>';
      cancelButton =
        '<button class="btn btn-danger cancel-order">Cancel</button>';
      break;
    case "to-ship":
      actionButton =
        '<button class="btn btn-success mark-next">Mark as Shipped</button>';
      break;
    case "to-deliver":
      actionButton =
        '<button class="btn btn-warning mark-next">Mark as Delivered</button>';
      break;
    case "completed":
      actionButton =
        '<button class="btn btn-danger refund-order">Refund</button>';
      break;
  }

  const itemsHTML = order.items
    .map(
      (item) => `
        <div class="item">
            <span class="item-name">${item.name}</span>
            <span class="item-qty">x${item.quantity}</span>
            <span class="item-price">₱${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `,
    )
    .join("");

  card.innerHTML = `
        <div class="order-header">
            <span class="order-id">#${order.id}</span>
            <span class="order-date">${order.date} at ${order.time}</span>
        </div>
        <div class="order-customer">
            <div class="customer-name">${order.customer}</div>
            <div class="customer-email">${order.email}</div>
            <div class="customer-address">${order.address}</div>
        </div>
        <div class="order-items">
            ${itemsHTML}
        </div>
        <div class="order-total">
            <span>Total</span>
            <span>₱${total.toFixed(2)}</span>
        </div>
        <div class="order-actions">
            ${statusBadge}
            <div>
                <button class="btn btn-outline">View</button>
                ${actionButton}
                ${cancelButton}
            </div>
        </div>
    `;

  return card;
}

function setupEventListeners() {
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderOrders(btn.dataset.tab);
    });
  });

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".order-card");
    if (!card) return;

    const orderId = card.dataset.orderId;
    const order = orders.find((o) => o.id === orderId);

    if (e.target.classList.contains("mark-next")) {
      switch (order.status) {
        case "to-pay":
          order.status = "to-ship";
          break;
        case "to-ship":
          order.status = "to-deliver";
          break;
        case "to-deliver":
          order.status = "completed";
          break;
      }
      renderOrders(document.querySelector(".tab-btn.active").dataset.tab);
    }

    if (e.target.classList.contains("cancel-order")) {
      if (confirm("Are you sure you want to cancel this order?")) {
        order.status = "cancelled";
        renderOrders(document.querySelector(".tab-btn.active").dataset.tab);
      }
    }

    if (e.target.classList.contains("refund-order")) {
      if (confirm("Process refund for this order?")) {
        order.status = "refunded";
        renderOrders(document.querySelector(".tab-btn.active").dataset.tab);
      }
    }

    if (e.target.classList.contains("btn-outline")) {
      alert(`Viewing order ${orderId}`);
    }
  });
}
