const ordersContainer = document.getElementById("orders-container");
const tabButtons = document.querySelectorAll(".tab-btn");
let allOrders = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchOrders();
  setupEventListeners();
});

async function fetchOrders() {
  try {
    const response = await fetch(`/api/list-orders`);
    if (!response.ok) throw new Error("Failed to fetch orders");

    allOrders = await response.json();
    renderOrders("to-pay");
  } catch (error) {
    console.error("Error fetching orders:", error);
    ordersContainer.innerHTML =
      "<p class='error-message'>Error loading orders. Please try again.</p>";
  }
}

function renderOrders(status) {
  ordersContainer.innerHTML = "";

  const statusMap = {
    "to-pay": "To Pay",
    "to-ship": "To Ship",
    "to-deliver": "To Deliver",
    completed: "Completed",
    cancelled: "Cancelled",
    refunded: "Refunded",
  };

  const filtered =
    status === "all"
      ? allOrders
      : allOrders.filter((o) => o.status === statusMap[status]);

  if (filtered.length === 0) {
    ordersContainer.innerHTML = `<p class='no-orders'>No ${statusMap[status] || status} orders found</p>`;
    return;
  }

  // Group by order_id
  const grouped = {};
  filtered.forEach((order) => {
    if (!grouped[order.order_id]) {
      grouped[order.order_id] = {
        ...order,
        items: [],
      };
    }
    grouped[order.order_id].items.push({
      book_id: order.book_id,
      quantity: order.quantity,
      price: order.price,
      book_title: order.book_title,
      book_author: order.book_author,
      image: order.image,
    });
  });

  Object.values(grouped).forEach((order) => {
    const card = createOrderCard(order);
    ordersContainer.appendChild(card);
  });
}

function createOrderCard(order) {
  const card = document.createElement("div");
  card.className = "order-card";
  card.dataset.orderId = order.order_id;

  const statusClass = order.status.toLowerCase().replace(/\s+/g, "-");

  const orderDate = new Date(order.xata_createdat);
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const addressParts = [
    order.street,
    order.barangay,
    order.city_or_municipality,
    order.province,
    order.region,
    order.postal_code,
  ]
    .filter(Boolean)
    .join(", ");

  let actionButton = "",
    cancelButton = "";
  switch (order.status) {
    case "To Pay":
      actionButton =
        '<button class="btn btn-primary mark-next">Mark as Paid</button>';
      cancelButton =
        '<button class="btn btn-danger cancel-order">Cancel</button>';
      break;
    case "To Ship":
      actionButton =
        '<button class="btn btn-success mark-next">Mark as Shipped</button>';
      break;
    case "To Deliver":
      actionButton =
        '<button class="btn btn-warning mark-next">Mark as Delivered</button>';
      break;
    case "Completed":
      actionButton =
        '<button class="btn btn-danger refund-order">Refund</button>';
      break;
  }

  const statusBadge = `<span class="status-badge status-${statusClass}">${order.status}</span>`;

  const itemsHTML = order.items
    .map(
      (item) => `
    <div class="order-item">
      <img src="${item.image}" alt="${item.book_title}" class="item-image" style="width: 100px; height: auto;" />
      <div class="item-details">
        <div class="item-title">${item.book_title}</div>
        <div class="item-author">by ${item.book_author}</div>
        <div class="item-qty-price">Qty: ${item.quantity} | ₱${item.price}</div>
      </div>
    </div>
  `,
    )
    .join("");

  card.innerHTML = `
    <div class="order-header">
      <span class="order-id">Order #${order.order_id.substring(0, 8)}</span>
      <span class="order-date">${formattedDate}</span>
    </div>
    <div class="order-customer">
      <div class="customer-info">
        <i class="fas fa-user"></i>
        <div>
          <div class="customer-name">${order.user_name}</div>
          <div class="customer-email">${order.user_email}</div>
        </div>
      </div>
      <div class="customer-address">
        <i class="fas fa-map-marker-alt"></i>
        <div>${addressParts}</div>
      </div>
    </div>
    <div class="order-items">${itemsHTML}</div>
    <div class="order-details">
      <div class="payment-method">
        <span>Payment Method:</span>
        <span class="method">${order.payment_method.toUpperCase()}</span>
      </div>
      <div class="order-total">
        <span>Total Amount:</span>
        <span class="amount">${order.total}</span>
      </div>
    </div>
    <div class="order-actions">
      ${statusBadge}
      <div class="action-buttons">
        <button class="btn btn-outline view-order">View Details</button>
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

    if (e.target.classList.contains("mark-next")) {
      console.log(`Marking order ${orderId} as next status`);
    }

    if (e.target.classList.contains("cancel-order")) {
      if (confirm("Are you sure you want to cancel this order?")) {
        console.log(`Canceling order ${orderId}`);
      }
    }

    if (e.target.classList.contains("refund-order")) {
      if (confirm("Are you sure you want to refund this order?")) {
        console.log(`Refunding order ${orderId}`);
      }
    }

    if (e.target.classList.contains("view-order")) {
      console.log(`Viewing details for order ${orderId}`);
    }
  });
}
