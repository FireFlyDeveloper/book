document.addEventListener("DOMContentLoaded", function () {
  // Example: Add a click handler for the hero button
  const heroButton = document.querySelector(".hero .btn-primary");
  if (heroButton) {
    heroButton.addEventListener("click", function () {
      navigateTo("browse");
    });
  }

  // Example: Add category click handlers
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.dataset.category;
      elements.genreFilter.value = category;
      navigateTo("browse");
      filterBooks(); // This will filter the books based on category in shared.js
    });
  });

  // Example: Add my books browse button handler
  const myBooksBrowseBtn = document.querySelector(
    "#my-books-section .empty-state .btn-primary",
  );
  if (myBooksBrowseBtn) {
    myBooksBrowseBtn.addEventListener("click", function () {
      navigateTo("browse");
    });
  }

  // Example: Add wishlist browse button handler
  const wishlistBrowseBtn = document.querySelector(
    "#wishlist-section .empty-state .btn-primary",
  );
  if (wishlistBrowseBtn) {
    wishlistBrowseBtn.addEventListener("click", function () {
      navigateTo("browse");
    });
  }

  // Add functionality for "Browse Collection" button in the hero section
  const browseCollectionBtn = document.querySelector(".hero .btn-primary");
  if (browseCollectionBtn) {
    browseCollectionBtn.addEventListener("click", function () {
      // Hide all sections
      document.querySelectorAll(".content-section").forEach((section) => {
        section.classList.remove("active");
      });

      // Show the "Browse" section
      const browseSection = document.getElementById("browse-section");
      browseSection.classList.add("active");

      // Set the browse link as active in the navigation
      const browseLink = document.querySelector(
        '.nav-link[data-section="browse"]',
      );
      browseLink.classList.add("active");

      // Ensure that the filter is applied if necessary
      filterBooks(); // This will call the filterBooks function from shared.js
    });
  }
});
