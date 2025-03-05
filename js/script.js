document.addEventListener("DOMContentLoaded", async function() {
    const API_URL = "https://your-railway-app-url/api/products"; // Cambia por la URL real
    const productTable = document.querySelector("#product-table tbody");
    const categoryFilter = document.getElementById("category-filter");
    const loadingElement = document.getElementById("loading");

    async function fetchProducts(category = "all") {
        try {
            loadingElement.style.display = "block";
            productTable.innerHTML = "";

            const response = await fetch(`${API_URL}?category=${category}`);
            const data = await response.json();

            if (!data.products || data.products.length === 0) {
                productTable.innerHTML = "<tr><td colspan='6'>No products available.</td></tr>";
                return;
            }

            data.products.forEach(product => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><img src="${product.image}" width="50"> ${product.name}</td>
                    <td>$${product.price || "N/A"}</td>
                    <td>${product.trend || "↔"}</td>
                    <td>${product.stock || "Unknown"}</td>
                    <td>⭐ ${product.rating || "N/A"}</td>
                    <td><a href="${product.url}" target="_blank">🔗 View</a></td>
                `;

                productTable.appendChild(row);
            });

        } catch (error) {
            console.error("Error fetching data:", error);
            productTable.innerHTML = "<tr><td colspan='6'>⚠ Error loading data.</td></tr>";
        } finally {
            loadingElement.style.display = "none";
        }
    }

    categoryFilter.addEventListener("change", () => {
        fetchProducts(categoryFilter.value);
    });

    fetchProducts();
});
