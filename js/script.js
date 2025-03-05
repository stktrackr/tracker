document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("search-btn");
    const searchQuery = document.getElementById("search-query");

    if (searchBtn && searchQuery) {
        searchBtn.addEventListener("click", function () {
            const query = searchQuery.value.trim();
            if (query === "") {
                alert("Please enter a product name!");
                return;
            }
            fetchProducts(query);
        });
    } else {
        console.error("Search elements not found in the DOM.");
    }
});

async function loadDefaultProducts() {
    const API_KEY = "53C09080269C4EFB88ECE212F519E7E4";
    const BASE_URL = `https://api.rainforestapi.com/request?api_key=${API_KEY}&type=bestsellers&amazon_domain=amazon.com`;

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (!data.bestsellers) {
            document.querySelector(".products-container").innerHTML = "<p>No products available.</p>";
            return;
        }

        displayProducts(data.bestsellers);
    } catch (error) {
        console.error("Error loading default products:", error);
    }
}

// Paginación de productos
let currentPage = 1;
const productsPerPage = 5;
let allProducts = [];

function displayProducts(products) {
    allProducts = products;
    updatePagination();
    renderPage(1);
}

function renderPage(page) {
    const productList = document.querySelector(".products-container");
    productList.innerHTML = "";

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = allProducts.slice(start, end);

    productsToShow.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: ${product.price ? product.price.raw : "Not Available"}</p>
            <a href="${product.link}" target="_blank">View on Amazon</a>
        `;
        productList.appendChild(productCard);
    });
}

function updatePagination() {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.onclick = () => renderPage(i);
        paginationContainer.appendChild(button);
    }
}

async function fetchProducts(query) {
    const API_KEY = "53C09080269C4EFB88ECE212F519E7E4";
    const BASE_URL = `https://api.rainforestapi.com/request?api_key=${API_KEY}&type=search&amazon_domain=amazon.com&search_term=${encodeURIComponent(query)}&sort_by=price_low_to_high`;

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (!data.search_results || data.search_results.length === 0) {
            document.querySelector(".products-container").innerHTML = "<p>No products found.</p>";
            return;
        }

        displayProducts(data.search_results);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
