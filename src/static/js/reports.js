// Initialize charts when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initCharts();
  setupEventListeners();
});

function initCharts() {
  // Sales Trend Chart
  const salesCtx = document.getElementById("sales-chart").getContext("2d");
  new Chart(salesCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Sales",
          data: [12500, 19000, 15000, 18000, 22000, 24589],
          borderColor: "#4361ee",
          backgroundColor: "rgba(67, 97, 238, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
  });

  // Top Selling Books Chart
  const booksCtx = document.getElementById("books-chart").getContext("2d");
  new Chart(booksCtx, {
    type: "bar",
    data: {
      labels: [
        "The Great Gatsby",
        "To Kill a Mockingbird",
        "1984",
        "Pride and Prejudice",
        "The Hobbit",
      ],
      datasets: [
        {
          label: "Copies Sold",
          data: [320, 280, 245, 210, 180],
          backgroundColor: [
            "rgba(67, 97, 238, 0.7)",
            "rgba(76, 201, 240, 0.7)",
            "rgba(248, 150, 30, 0.7)",
            "rgba(249, 65, 68, 0.7)",
            "rgba(120, 111, 166, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
  });
}

function setupEventListeners() {
  // Date range selector
  document.getElementById("report-range").addEventListener("change", (e) => {
    console.log(`Date range changed to: ${e.target.value}`);
    // In a real app, you would fetch data for the selected range
  });

  // Export button
  document.getElementById("export-report").addEventListener("click", () => {
    alert("Exporting report...");
    // In a real app, this would generate a CSV/PDF
  });
}
