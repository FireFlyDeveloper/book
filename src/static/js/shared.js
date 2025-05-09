// State management
let state = {
  cart: [],
  wishlist: [],
  currentBook: null,
  currentSection: "home",
  user: {
    name: "",
    email: "",
    phone: "",
    xata_createdat: "",
    avatar: "",
  },
};

async function addOrderItem(order_id, book_id, quantity, price) {
  try {
    const response = await fetch("/api/create-order-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id, book_id, quantity, price }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return [];
  }
}

async function createOrders(payment, status, address_id, total) {
  try {
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment_method: payment,
        status,
        address_id,
        total,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return [];
  }
}

async function createAddress(
  street,
  barangay,
  city_or_municipality,
  province,
  region,
  postal_code,
) {
  try {
    const response = await fetch("/api/create-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        street,
        barangay,
        city_or_municipality,
        province,
        region,
        postal_code,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return [];
  }
}

async function addCartItem(id, quantity) {
  try {
    const response = await fetch("/api/add-cart-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book_id: id, quantity }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return [];
  }
}

async function updateCart(quantity, book_id) {
  try {
    const response = await fetch("/api/update-cart-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity, book_id }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating cart:", error);
    return [];
  }
}

async function fetchCart() {
  try {
    const response = await fetch("/api/get-cart-items-by-cart");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return [];
  }
}

async function fetchOrders() {
  try {
    const response = await fetch("/api/get-order-user");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

async function removeCartItem(id) {
  try {
    const response = await fetch(`/api/delete-cart-item/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error removing cart item:", error);
    return [];
  }
}

async function fetchUser() {
  try {
    const response = await fetch("/api/get-user");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

async function updateUser(name, email, phone) {
  try {
    const response = await fetch("/api/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user data:", error);
    return null;
  }
}

async function fetchBooks() {
  try {
    const response = await fetch("/api/books");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

let books;

// DOM Elements
const elements = {
  navLinks: document.querySelectorAll(".nav-link"),
  contentSections: document.querySelectorAll(".content-section"),
  cartBtn: document.getElementById("cart-btn"),
  accountBtn: document.getElementById("account-btn"),
  cartSidebar: document.getElementById("cart-sidebar"),
  cartItems: document.getElementById("cart-items"),
  cartTotalPrice: document.getElementById("cart-total-price"),
  cartCount: document.querySelector(".cart-count"),
  closeCart: document.querySelector(".close-cart"),
  bookDetailModal: document.getElementById("book-detail-modal"),
  closeModal: document.querySelectorAll(".close-modal"),
  accountModal: document.getElementById("account-modal"),
  addToCartDetail: document.getElementById("add-to-cart-detail"),
  addToWishlistDetail: document.getElementById("add-to-wishlist-detail"),
  buyNowBtn: document.getElementById("buy-now-btn"),
  searchInput: document.getElementById("search-input"),
  genreFilter: document.getElementById("genre-filter"),
  checkoutBtn: document.getElementById("checkout-btn"),
  checkoutModal: document.getElementById("checkout-modal"),
  checkoutForm: document.getElementById("checkout-form"),
  checkoutItems: document.getElementById("checkout-items"),
  checkoutTotal: document.getElementById("checkout-total"),
  toPayContent: document.getElementById("to-pay-content"),
  toReceiveContent: document.getElementById("to-receive-content"),
  completedContent: document.getElementById("completed-content"),
  cancelledContent: document.getElementById("cancelled-content"),
  refundedContent: document.getElementById("refunded-content"),
  allOrdersContent: document.getElementById("all-orders-content"),
};

// Notification functions
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Add appropriate icon based on type
  let icon = "";
  switch (type) {
    case "success":
      icon = '<i class="fas fa-check-circle"></i>';
      break;
    case "warning":
      icon = '<i class="fas fa-exclamation-circle"></i>';
      break;
    case "error":
      icon = '<i class="fas fa-times-circle"></i>';
      break;
    default:
      icon = '<i class="fas fa-info-circle"></i>';
  }

  notification.innerHTML = `${icon} ${message}`;
  document.body.appendChild(notification);

  // Calculate position based on existing notifications
  const existingNotifications = document.querySelectorAll(".notification.show");
  if (existingNotifications.length > 0) {
    const lastNotification =
      existingNotifications[existingNotifications.length - 1];
    const lastPosition = parseInt(lastNotification.style.top || "20px");
    notification.style.top = `${lastPosition + 60}px`;
  }

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
      // Recalculate positions of remaining notifications
      const remainingNotifications = document.querySelectorAll(".notification");
      remainingNotifications.forEach((notif, index) => {
        notif.style.top = `${20 + index * 60}px`;
      });
    }, 300);
  }, 3000);
}

// Helper functions
function formatPrice(price) {
  return `₱${price}`;
}

function updateCartCount() {
  const count = state.cart.reduce((total, item) => total + item.quantity, 0);
  elements.cartCount.textContent = count;
}

function calculateCartTotal() {
  return state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

function renderCartItems() {
  if (state.cart.length === 0) {
    elements.cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    elements.cartTotalPrice.textContent = formatPrice(0);
    return;
  }

  let cartHTML = "";
  state.cart.forEach((item) => {
    cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-author">${item.author}</p>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button class="decrease-quantity">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-quantity">+</button>
                        </div>
                        <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
  });

  elements.cartItems.innerHTML = cartHTML;
  elements.cartTotalPrice.textContent = formatPrice(calculateCartTotal());

  // Add event listeners to quantity buttons
  document.querySelectorAll(".increase-quantity").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log("Increase quantity");
      const itemId = e.target.closest(".cart-item").dataset.id;
      console.log("Item ID:", itemId);
      increaseQuantity(itemId);
    });
  });

  document.querySelectorAll(".decrease-quantity").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = e.target.closest(".cart-item").dataset.id;
      decreaseQuantity(itemId);
    });
  });

  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = e.target.closest(".cart-item").dataset.id;
      removeFromCart(itemId);
    });
  });
}

function renderBookDetail(book) {
  document.getElementById("detail-book-title").textContent = book.title;
  document.getElementById("detail-book-author").textContent = book.author;
  document.getElementById("detail-book-price").textContent = formatPrice(
    book.price,
  );
  document.getElementById("detail-book-image").src = book.image;
  document.getElementById("detail-book-description").textContent =
    book.description;
  document.getElementById("detail-book-genre").textContent = book.genre;
  document.getElementById("detail-book-pages").textContent = book.pages;
  document.getElementById("detail-book-publisher").textContent = book.publisher;
  document.getElementById("detail-book-language").textContent = book.language;

  // Check if book is in wishlist
  const isInWishlist = state.wishlist.some((item) => item.id === book.id);
  const wishlistBtn = document.getElementById("add-to-wishlist-detail");
  if (isInWishlist) {
    wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
    wishlistBtn.classList.add("active");
  } else {
    wishlistBtn.innerHTML = '<i class="far fa-heart"></i> Wishlist';
    wishlistBtn.classList.remove("active");
  }
}

function renderBooks(books, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (books.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <p>No books found</p>
            </div>
        `;
    return;
  }

  let booksHTML = "";
  books.forEach((book) => {
    const isInWishlist = state.wishlist.some((item) => item.id === book.id);
    booksHTML += `
            <div class="book-card" data-id="${book.id}">
                <div class="book-image">
                    <img src="${book.image}" alt="${book.title}">
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <p class="book-price">${formatPrice(book.price)}</p>
                    <div class="book-actions">
                        <button class="btn btn-outline add-to-cart">Add to Cart</button>
                        <button class="wishlist-btn ${isInWishlist ? "active" : ""}">
                            <i class="${isInWishlist ? "fas" : "far"} fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
  });

  container.innerHTML = booksHTML;

  // Add event listeners to book cards
  document.querySelectorAll(`#${containerId} .book-card`).forEach((card) => {
    card.addEventListener("click", (e) => {
      if (
        !e.target.closest(".add-to-cart") &&
        !e.target.closest(".wishlist-btn")
      ) {
        const book = books.find((b) => b.id === card.dataset.id);
        if (book) {
          state.currentBook = book;
          renderBookDetail(book);
          elements.bookDetailModal.classList.add("active");
        }
      }
    });
  });

  // Add event listeners to add to cart buttons
  document.querySelectorAll(`#${containerId} .add-to-cart`).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const bookId = e.target.closest(".book-card").dataset.id;
      const book = books.find((b) => b.id === bookId);
      if (book) {
        addToCart(book);
      }
    });
  });

  // Add event listeners to wishlist buttons
  document.querySelectorAll(`#${containerId} .wishlist-btn`).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const bookId = e.target.closest(".book-card").dataset.id;
      const book = books.find((b) => b.id === bookId);
      if (book) {
        toggleWishlist(book);
        // Update the button appearance
        const isInWishlist = state.wishlist.some((item) => item.id === book.id);
        if (isInWishlist) {
          btn.innerHTML = '<i class="fas fa-heart"></i>';
          btn.classList.add("active");
        } else {
          btn.innerHTML = '<i class="far fa-heart"></i>';
          btn.classList.remove("active");
        }
      }
    });
  });
}

// Cart functions
function addToCart(book) {
  const existingItem = state.cart.find((item) => item.id === book.id);

  if (existingItem) {
    updateCart(existingItem.quantity + 1, book.id).then(() => {
      existingItem.quantity += 1;
      showNotification(`${book.title} quantity increased in cart`, "success");
      updateCartCount();
      renderCartItems();
    });
  } else {
    addCartItem(book.id, 1).then(() => {
      state.cart.push({
        ...book,
        quantity: 1,
      });
      showNotification(`${book.title} added to cart`, "success");
      updateCartCount();
      renderCartItems();
    });
  }
}

function removeFromCart(bookId) {
  removeCartItem(bookId).then(() => {
    const book = state.cart.find((item) => item.id === bookId);
    state.cart = state.cart.filter((item) => item.id !== bookId);
    updateCartCount();
    renderCartItems();

    if (book) {
      showNotification(`${book.title} removed from cart`, "warning");
    }
  });
}

function increaseQuantity(bookId) {
  const item = state.cart.find((item) => item.id === bookId);
  if (item) {
    updateCart(item.quantity + 1, item.id).then(() => {
      item.quantity += 1;
      updateCartCount();
      renderCartItems();
      showNotification(`${item.title} quantity increased`, "success");
    });
  }
}

function decreaseQuantity(bookId) {
  const item = state.cart.find((item) => item.id === bookId);
  if (item) {
    if (item.quantity > 1) {
      updateCart(item.quantity - 1, item.id).then(() => {
        item.quantity -= 1;
        updateCartCount();
        renderCartItems();
        showNotification(`${item.title} quantity decreased`, "warning");
      });
    } else {
      removeFromCart(bookId);
    }
  }
}

// Wishlist functions
function toggleWishlist(book) {
  const existingIndex = state.wishlist.findIndex((item) => item.id === book.id);

  if (existingIndex >= 0) {
    state.wishlist.splice(existingIndex, 1);
    showNotification(`${book.title} removed from wishlist`, "warning");
  } else {
    state.wishlist.push(book);
    showNotification(`${book.title} added to wishlist`, "success");
  }

  // Update wishlist display if we're on the wishlist page
  if (state.currentSection === "wishlist") {
    renderBooks(state.wishlist, "wishlist-grid");
  }

  // Update the detail modal if it's open for this book
  if (state.currentBook && state.currentBook.id === book.id) {
    renderBookDetail(book);
  }
}

// Order functions
function processOrders(orders) {
  // Group items by order_id
  const groupedOrders = {};

  orders.forEach((order) => {
    if (!groupedOrders[order.order_id]) {
      groupedOrders[order.order_id] = {
        order_id: order.order_id,
        xata_createdat: order.xata_createdat,
        status: order.status,
        total: order.total,
        payment_method: order.payment_method,
        address: {
          street: order.street,
          city_or_municipality: order.city_or_municipality,
          postal_code: order.postal_code,
        },
        items: [],
      };
    }

    groupedOrders[order.order_id].items.push({
      book_id: order.book_id,
      quantity: order.quantity,
      price: order.price,
      title: order.book_title,
      author: order.book_author,
      image: order.image,
    });
  });

  return Object.values(groupedOrders);
}

function renderOrders(orders) {
  // Clear all order sections first
  elements.toPayContent.innerHTML = "";
  elements.toReceiveContent.innerHTML = "";
  elements.completedContent.innerHTML = "";
  elements.cancelledContent.innerHTML = "";
  elements.refundedContent.innerHTML = "";
  elements.allOrdersContent.innerHTML = "";

  // Add empty state if no orders
  const emptyHTML = `
    <div class="empty-orders">
      <i class="fas fa-box-open"></i>
      <p>No orders found</p>
    </div>
  `;

  if (orders.length === 0) {
    elements.allOrdersContent.innerHTML = emptyHTML;
    return;
  }

  // Process and render each order
  orders.forEach((order) => {
    const orderDate = new Date(order.xata_createdat);
    const formattedDate = orderDate.toLocaleDateString();
    const formattedTime = orderDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const addressHTML = `
      <div class="order-address">
        <strong>Shipping to:</strong> 
        ${order.address.street}, ${order.address.city_or_municipality}, ${order.address.postal_code}
      </div>
    `;

    const itemsHTML = order.items
      .map(
        (item) => `
      <div class="order-item">
        <div class="order-item-img">
          <img src="${item.image}" alt="${item.title}" />
        </div>
        <div class="order-item-info">
          <p class="order-item-title">${item.title}</p>
          <p class="order-item-author">${item.author}</p>
          <p class="order-item-price">${formatPrice(item.price)} x ${item.quantity}</p>
        </div>
      </div>
    `,
      )
      .join("");

    const statusSlug = order.status.toLowerCase().replace(" ", "-");
    const orderHTML = `
      <div class="order-card" data-id="${order.order_id}" data-status="${statusSlug}">
        <div class="order-header">
          <span class="order-id">#${order.order_id.slice(-6)}</span>
          <span class="order-date">${formattedDate} at ${formattedTime}</span>
        </div>
        <div class="order-items">${itemsHTML}</div>
        <div class="order-total">Total: ${order.total}</div>
        ${addressHTML}
        <div class="order-status">Status: ${order.status}</div>
        ${getActionButtons(order.status, order.order_id)}
      </div>
    `;

    // Add to appropriate status section
    switch (order.status) {
      case "To Pay":
        elements.toPayContent.innerHTML += orderHTML;
        break;
      case "To Receive":
        elements.toReceiveContent.innerHTML += orderHTML;
        break;
      case "Completed":
        elements.completedContent.innerHTML += orderHTML;
        break;
      case "Cancelled":
        elements.cancelledContent.innerHTML += orderHTML;
        break;
      case "Refunded":
        elements.refundedContent.innerHTML += orderHTML;
        break;
    }

    // Always add to all orders
    elements.allOrdersContent.innerHTML += orderHTML;
  });

  // Add empty states if sections are empty
  if (elements.toPayContent.children.length === 0)
    elements.toPayContent.innerHTML = emptyHTML;
  if (elements.toReceiveContent.children.length === 0)
    elements.toReceiveContent.innerHTML = emptyHTML;
  if (elements.completedContent.children.length === 0)
    elements.completedContent.innerHTML = emptyHTML;
  if (elements.cancelledContent.children.length === 0)
    elements.cancelledContent.innerHTML = emptyHTML;
  if (elements.refundedContent.children.length === 0)
    elements.refundedContent.innerHTML = emptyHTML;
}

function getActionButtons(status, orderId) {
  let buttons = "";

  switch (status) {
    case "To Pay":
      buttons = `<button class="btn btn-danger cancel-btn" data-order="${orderId}">Cancel</button>`;
      break;
    case "To Receive":
      buttons = `<button class="btn btn-success receive-btn" data-order="${orderId}">Mark as Received</button>`;
      break;
    case "Completed":
      buttons = `<button class="btn btn-warning refund-btn" data-order="${orderId}">Request Refund</button>`;
      break;
  }

  return buttons ? `<div class="order-actions">${buttons}</div>` : "";
}

// Navigation functions
function navigateTo(section) {
  state.currentSection = section;

  // Update active nav link
  elements.navLinks.forEach((link) => {
    if (link.dataset.section === section) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Show the corresponding section
  elements.contentSections.forEach((sectionEl) => {
    if (sectionEl.id === `${section}-section`) {
      sectionEl.classList.add("active");
    } else {
      sectionEl.classList.remove("active");
    }
  });

  // Load appropriate content
  switch (section) {
    case "home":
      renderBooks(
        books.filter((book) => book.featured),
        "featured-books-grid",
      );
      renderBooks(
        books.filter((book) => !book.featured),
        "new-releases-grid",
      );
      break;
    case "browse":
      renderBooks(books, "browse-books-grid");
      break;
    case "categories":
      // Categories are static in HTML
      break;
    case "my-books":
      // Load orders when navigating to my-books section
      fetchOrders().then((orders) => {
        const processedOrders = processOrders(orders);
        renderOrders(processedOrders);
      });
      break;
    case "wishlist":
      renderBooks(state.wishlist, "wishlist-grid");
      break;
  }
}

// Filter functions
function filterBooks() {
  const searchTerm = elements.searchInput.value.toLowerCase();
  const genreFilter = elements.genreFilter.value;

  let filteredBooks = books;

  if (searchTerm) {
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm),
    );
  }

  if (genreFilter) {
    filteredBooks = filteredBooks.filter((book) => book.genre === genreFilter);
  }

  renderBooks(filteredBooks, "browse-books-grid");
}

function addOrder(items, sectionId, address, statusLabel = "To Pay") {
  const sectionContent = document.getElementById(sectionId);
  const allOrdersContent = document.getElementById("all-orders-content");

  const now = new Date();
  const orderId = `#${Date.now()}`;
  const orderDate = now.toLocaleDateString();
  const orderTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  createAddress(
    address.street,
    address.barangay,
    address.city,
    address.province,
    address.region,
    address.zip,
  ).then((addressData) => {
    createOrders(
      address.payment,
      statusLabel,
      addressData.address.xata_id,
      total,
    ).then((orderData) => {
      // Add all order items
      const orderItemPromises = items.map((item) =>
        addOrderItem(
          orderData.order.xata_id,
          item.id,
          item.quantity,
          item.price,
        ),
      );

      Promise.all(orderItemPromises).then(() => {
        // After all items are added, refresh the orders display
        fetchOrders().then((orders) => {
          const processedOrders = processOrders(orders);
          renderOrders(processedOrders);
        });
      });
    });
  });

  const fullAddress = `${address.street}, ${address.barangay}, ${address.city}, ${address.province}, ${address.region}, ZIP ${address.zip}`;

  // Generate button HTML only if adding to All Orders
  function getActionButtons(targetSectionId = sectionId) {
    if (targetSectionId !== "all-orders-content") return "";

    switch (statusLabel) {
      case "To Pay":
        return `<button class="btn btn-danger cancel-btn">Cancel</button>`;
      case "To Receive":
        return `<button class="btn btn-success receive-btn">Mark as Received</button>`;
      case "Completed":
        return `<button class="btn btn-warning refund-btn">Refund</button>`;
      default:
        return "";
    }
  }

  const orderHTML = `
    <div class="order-card" data-id="${orderId}" data-status="${statusLabel.toLowerCase().replace(" ", "-")}" data-section="${sectionId}">
      <div class="order-header">
        <span class="order-id">${orderId}</span>
        <span class="order-date">${orderDate} at ${orderTime}</span>
      </div>
      <div class="order-items">
        ${items
          .map(
            (item) => `
          <div class="order-item">
            <div class="order-item-img"><img src="${item.image}" alt="${item.title}" /></div>
            <div class="order-item-info">
              <p class="order-item-title">${item.title}</p>
              <p class="order-item-author">${item.author}</p>
              <p class="order-item-price">${formatPrice(item.price)} x ${item.quantity}</p>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="order-total">Total: ${formatPrice(total)}</div>
      <div class="order-address"><strong>Shipping to:</strong> ${fullAddress}</div>
      <div class="order-status">Status: ${statusLabel}</div>
      <div class="order-actions">${getActionButtons("all-orders-content")}</div>
    </div>
  `;

  // Remove empty message from the section this is being added to
  const sectionEmpty = sectionContent.querySelector(".empty-orders");
  if (sectionEmpty) sectionEmpty.remove();

  sectionContent.innerHTML += orderHTML;

  // Add to All Orders with buttons if not already there
  if (sectionId !== "all-orders-content") {
    const allEmpty = allOrdersContent.querySelector(".empty-orders");
    if (allEmpty) allEmpty.remove();

    const allOrderHTML = `
      <div class="order-card" data-id="${orderId}" data-status="${statusLabel.toLowerCase().replace(" ", "-")}" data-section="all-orders-content">
        <div class="order-header">
          <span class="order-id">${orderId}</span>
          <span class="order-date">${orderDate} at ${orderTime}</span>
        </div>
        <div class="order-items">
          ${items
            .map(
              (item) => `
            <div class="order-item">
              <div class="order-item-img"><img src="${item.image}" alt="${item.title}" /></div>
              <div class="order-item-info">
                <p class="order-item-title">${item.title}</p>
                <p class="order-item-author">${item.author}</p>
                <p class="order-item-price">${formatPrice(item.price)} x ${item.quantity}</p>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
        <div class="order-total">Total: ${formatPrice(total)}</div>
        <div class="order-address"><strong>Shipping to:</strong> ${fullAddress}</div>
        <div class="order-status">Status: ${statusLabel}</div>
        <div class="order-actions">${getActionButtons()}</div>
      </div>
    `;

    allOrdersContent.innerHTML += allOrderHTML;
  }
}

function setupEventListeners() {
  // ======================
  // Navigation/UI Listeners
  // ======================
  elements.navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo(link.dataset.section);
    });
  });

  // Cart toggle
  elements.cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    elements.cartSidebar.classList.add("active");
  });

  // Account modal
  elements.accountBtn.addEventListener("click", (e) => {
    e.preventDefault();
    elements.accountModal.classList.add("active");
  });

  // Close buttons
  elements.closeCart.addEventListener("click", () => {
    elements.cartSidebar.classList.remove("active");
  });

  elements.closeModal.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal").forEach((modal) => {
        modal.classList.remove("active");
      });
    });
  });

  // ======================
  // Book Interaction
  // ======================
  elements.addToCartDetail.addEventListener("click", () => {
    if (state.currentBook) {
      addToCart(state.currentBook);
    }
  });

  elements.addToWishlistDetail.addEventListener("click", () => {
    if (state.currentBook) {
      toggleWishlist(state.currentBook);
    }
  });

  // ======================
  // Checkout Flow
  // ======================
  // Buy Now (single item)
  elements.buyNowBtn.addEventListener("click", () => {
    if (state.currentBook) {
      showCheckout([
        {
          ...state.currentBook,
          quantity: 1,
        },
      ]);
      elements.bookDetailModal.classList.remove("active");
      showNotification(
        `Proceeding to checkout with ${state.currentBook.title}`,
        "success",
      );
    }
  });

  // Checkout (full cart)
  elements.checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (state.cart.length === 0) {
      showNotification("Your cart is empty", "warning");
      return;
    }
    showCheckout([...state.cart]);
    elements.cartSidebar.classList.remove("active");
  });

  // Checkout form submission
  elements.checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const orderItems = state.currentBook
      ? [
          {
            ...state.currentBook,
            quantity: 1,
          },
        ]
      : [...state.cart];

    const address = {
      street: document.getElementById("street").value,
      barangay: document.getElementById("barangay").value,
      region: document.getElementById("region").value,
      province: document.getElementById("province").value,
      city: document.getElementById("city").value,
      zip: document.getElementById("zip").value,
      payment: document.getElementById("payment").value,
    };

    addOrder(orderItems, "to-pay-content", address, "To Pay");

    showNotification("Order placed successfully!", "success");

    if (!state.currentBook) {
      state.cart = [];
      updateCartCount();
      renderCartItems();
    }

    elements.checkoutModal.classList.remove("active");
    elements.bookDetailModal.classList.remove("active");
    elements.checkoutForm.reset();
  });

  // ======================
  // Search/Filter
  // ======================
  elements.searchInput.addEventListener("input", filterBooks);
  elements.genreFilter.addEventListener("change", filterBooks);

  // ======================
  // User Profile
  // ======================
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    document.getElementById("edit-profile-form").classList.add("active");
    document.getElementById("edit-name").value = state.user.name;
    document.getElementById("edit-phone").value = state.user.phone
      ? state.user.phone
      : "";
    document.getElementById("edit-email").value = state.user.email;
  });

  document.getElementById("cancel-edit").addEventListener("click", () => {
    document.getElementById("edit-profile-form").classList.remove("active");
  });

  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    updateUser(
      document.getElementById("edit-name").value,
      (document.getElementById("account-email").textContent = state.user.email),
      document.getElementById("edit-phone").value,
    ).then(() => {
      state.user.name = document.getElementById("edit-name").value;
      state.user.phone = document.getElementById("edit-phone").value;
      state.user.email = document.getElementById("edit-email").value;

      document.getElementById("account-name").textContent = state.user.name;
      document.getElementById("account-phone").textContent = state.user.phone;
      document.getElementById("account-email").textContent = state.user.email;

      document.getElementById("edit-profile-form").classList.remove("active");
      showNotification("Profile updated successfully!", "success");
    });
  });

  document.getElementById("change-avatar").addEventListener("click", () => {
    document.getElementById("avatar-upload").click();
  });

  document.getElementById("avatar-upload").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        state.user.avatar = event.target.result;
        document.getElementById("avatar-image").src = state.user.avatar;
        showNotification("Profile picture updated!", "success");
      };
      reader.readAsDataURL(file);
    }
  });

  // ======================
  // Order Actions
  // ======================
  document.addEventListener("click", (e) => {
    // Handle order action buttons
    if (e.target.classList.contains("cancel-btn")) {
      const orderId =
        e.target.dataset.order || e.target.closest(".order-card")?.dataset.id;
      if (orderId && confirm("Are you sure you want to cancel this order?")) {
        // In a real app, you would call an API to update the order status
        // For now, we'll just update the UI
        const orderCard = e.target.closest(".order-card");
        if (orderCard) {
          orderCard.remove();
          // Refresh orders to reflect the change
          fetchOrders().then((orders) => {
            const processedOrders = processOrders(orders);
            renderOrders(processedOrders);
          });
        }
        showNotification("Order cancelled", "warning");
      }
    }

    if (e.target.classList.contains("receive-btn")) {
      const orderId =
        e.target.dataset.order || e.target.closest(".order-card")?.dataset.id;
      if (orderId) {
        // In a real app, you would call an API to update the order status
        const orderCard = e.target.closest(".order-card");
        if (orderCard) {
          orderCard.remove();
          // Refresh orders to reflect the change
          fetchOrders().then((orders) => {
            const processedOrders = processOrders(orders);
            renderOrders(processedOrders);
          });
        }
        showNotification("Order marked as received", "success");
      }
    }

    if (e.target.classList.contains("refund-btn")) {
      const orderId =
        e.target.dataset.order || e.target.closest(".order-card")?.dataset.id;
      if (
        orderId &&
        confirm("Are you sure you want to request a refund for this order?")
      ) {
        // In a real app, you would call an API to update the order status
        const orderCard = e.target.closest(".order-card");
        if (orderCard) {
          orderCard.remove();
          // Refresh orders to reflect the change
          fetchOrders().then((orders) => {
            const processedOrders = processOrders(orders);
            renderOrders(processedOrders);
          });
        }
        showNotification("Refund requested", "warning");
      }
    }
  });

  // ======================
  // Modal Background Click
  // ======================
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      document.querySelectorAll(".modal").forEach((modal) => {
        modal.classList.remove("active");
      });
    }
  });
}

// ======================
// Checkout Function (separate utility function)
// ======================
function showCheckout(items) {
  elements.checkoutItems.innerHTML = "";
  let total = 0;

  items.forEach((item) => {
    total += item.price * item.quantity;
    const itemElement = document.createElement("div");
    itemElement.className = "checkout-item";
    itemElement.innerHTML = `
      <span>${item.title} (x${item.quantity})</span>
      <span>${formatPrice(item.price * item.quantity)}</span>
    `;
    elements.checkoutItems.appendChild(itemElement);
  });

  elements.checkoutTotal.textContent = formatPrice(total);
  elements.checkoutModal.classList.add("active");
}

// Initialize the app
function init() {
  fetchUser().then((user) => {
    state.user = user;
    document.getElementById("account-name").textContent = state.user.name;
    document.getElementById("account-phone").textContent = state.user.phone;
    document.getElementById("account-email").textContent = state.user.email;
    document.getElementById("account-join-date").textContent = new Date(
      state.user.xata_createdat,
    ).toLocaleDateString();
    fetchBooks().then((data) => {
      books = data;
      fetchCart().then((cart) => {
        state.cart = cart;
        updateCartCount();
        setupEventListeners();
        navigateTo("home");
        renderCartItems();
      });
    });
  });

  // Set default avatar if none exists
  const avatarImg = document.getElementById("avatar-image");
  if (!state.user.avatar) {
    avatarImg.src =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMnptMCAyYzQuNDE4IDAgOCAzLjU4MiA4IDhzLTMuNTgyIDgtOCA4LTgtMy41ODItOC04IDMuNTgyLTggOC04eiIgZmlsbD0iIzVjNmJjMCIvPjxwYXRoIGQ9Ik0xMiA1Yy0xLjY1NCAwLTMgMS4zNDYtMyAzczEuMzQ2IDMgMyAzIDMtMS4zNDYgMy0zLTEuMzQ2LTMtMy0zem0wIDdjLTIuMjA5IDAtNCAxLjM0My00IDN2MWg4di0xYzAtMS42NTctMS43OTEtMy00LTN6IiBmaWxsPSIjNWM2YmMwIi8+PC9zdmc+";
  } else {
    avatarImg.src = state.user.avatar;
  }
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", init);
