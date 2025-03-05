document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("search-btn");
    const searchQuery = document.getElementById("search-query");
    const productList = document.querySelector(".products-container");

    searchBtn.addEventListener("click", async function () {
        const query = searchQuery.value.trim();
        if (query === "") {
            alert("Please enter a product name!");
            return;
        }
        console.log("Searching for:", query);
        fetchProducts(query);
    });

    async function fetchProducts(query) {
        const API_KEY = "TU_API_KEY"; // Inserta tu API Key
        const BASE_URL = `https://api.rainforestapi.com/request?api_key=${API_KEY}&type=search&amazon_domain=amazon.com&search_term=${encodeURIComponent(query)}`;

        try {
            console.log("Fetching from API:", BASE_URL);
            const response = await fetch(BASE_URL);
            const data = await response.json();
            console.log("API Response:", data);

            if (!data.search_results) {
                productList.innerHTML = "<p>No products found.</p>";
                return;
            }

            productList.innerHTML = ""; // Limpiar antes de insertar nuevos productos

            data.search_results.forEach(product => {
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

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
});
