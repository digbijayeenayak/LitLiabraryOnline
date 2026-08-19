document.addEventListener("DOMContentLoaded", function () {
  fetchBooks(); // Load books when the page is first loaded
});

// Reload books when the tab becomes active
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    fetchBooks();
  }
});

// Function to fetch books and update UI
function fetchBooks() {
  fetch("/") // Flask home route
    .then((response) => response.text()) // Get HTML response
    .then((html) => {
      document.getElementById("booksContainer").innerHTML = html;
    })
    .catch((error) => console.error("Error loading books:", error));
}

// Function to load book details dynamically
function loadBookDetails(bookId) {
  fetch(`/book/${bookId}`)
    .then((response) => response.text()) // Get HTML response
    .then((html) => {
      document.getElementById("bookDetailsContainer").innerHTML = html;
    })
    .catch((error) => console.error("Error loading book details:", error));
}

/*let lastScrollTop = 0;
const footer = document.querySelector("footer");

window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down, hide footer
        footer.style.bottom = "-100px";
    } else {
        // Scrolling up, show footer
        footer.style.bottom = "0";
    }

    lastScrollTop = scrollTop;
});
*/

/*window.addEventListener("scroll", function () {
  const footer = document.querySelector("footer");
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= documentHeight) {
    // Scrolled to the bottom, show footer
    footer.style.bottom = "0";
  } else {
    // Not at the bottom, hide footer
    footer.style.bottom = "-100px";
  }
});

// Initially hide the footer when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector("footer");
  footer.style.bottom = "-100px";
});

*/

/*
document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector("footer");
  footer.style.bottom = "-100%"; // Ensure footer is hidden on load
});

window.addEventListener("scroll", function () {
  const footer = document.querySelector("footer");

  // Check if user is at the very bottom of the page
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Calculate how close to the bottom (in pixels) to trigger the footer
  const scrollThreshold = 20; // Show footer when within 20px of the bottom

  if (documentHeight - (scrollTop + windowHeight) <= scrollThreshold) {
    footer.style.bottom = "0"; // Show footer
  } else {
    footer.style.bottom = "-100%"; // Hide footer
  }
});
*/


  const searchButton = document.getElementById("searchButton");
  const searchBar = document.querySelector(".search-bar");

  // Toggle search bar visibility
  searchButton.addEventListener("click", function () {
    searchBar.classList.toggle("active");
  });

  // Handle enter key press to simulate search
  document.getElementById("searchInput").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });


// Pagination
document.addEventListener("DOMContentLoaded", function () {
  const itemsPerPage = 12; // 2 rows of 4 books each
  const bookCards = document.querySelectorAll(".col"); // Select all book cards
  const totalPages = Math.ceil(bookCards.length / itemsPerPage); // Calculate total pages
  const paginationContainer = document.getElementById("pagination"); // Select pagination container

  let currentPage = 1;
  const maxVisiblePages = 6; // Show only 6 page numbers at a time

  function showPage(page) {
    bookCards.forEach((card, index) => {
      card.style.display =
        index >= (page - 1) * itemsPerPage && index < page * itemsPerPage
          ? "block"
          : "none";
    });

    updatePaginationButtons();
  }

  function updatePaginationButtons() {
    paginationContainer.innerHTML = ""; // Clear existing buttons

    // Previous Button
    const prevButton = document.createElement("li");
    prevButton.classList.add("page-item");
    if (currentPage === 1) prevButton.classList.add("disabled");
    prevButton.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });
    paginationContainer.appendChild(prevButton);

    // Generate page numbers with max 6 pages visible
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement("li");
      pageButton.classList.add("page-item");
      if (i === currentPage) pageButton.classList.add("active");

      pageButton.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
      });
      paginationContainer.appendChild(pageButton);
    }

    // Next Button
    const nextButton = document.createElement("li");
    nextButton.classList.add("page-item");
    if (currentPage === totalPages) nextButton.classList.add("disabled");
    nextButton.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    });
    paginationContainer.appendChild(nextButton);
  }

  // Initialize the first page
  showPage(currentPage);
});
