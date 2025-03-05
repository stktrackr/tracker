document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("productList");
    const categoryFilter = document.getElementById("categoryFilter");
    const loadingMessage = document.getElementById("loadingMessage");

    // URL de API (Usa la nueva API que configuraste en Railway)
    const API_URL = "https://api.tuapi.com/products";  

    async function fetchProducts(category = "all") {
        try {
            loadingMessage.textContent = "🔄 Fetching data...";
            const response = await fetch(`${API_URL}?category=${category}`);
            const data = await response.json();
            
            // Limpiar lista
            productList.innerHTML = "";

            if (data.length === 0) {
                productList.innerHTML = "<tr><td colspan='6'>No products available.</td></tr>";
                return;
            }

            data.forEach(product => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td><img src="${product.image}" alt="${product.name}"></td>
                    <td>$${product.price}</td>
                    <td>${product.trend || "N/A"}</td>
                    <td>${product.stock ? "In Stock" : "Out of Stock"}</td>
                    <td>⭐ ${product.rating}</td>
                    <td><a href="${product.url}" target="_blank">🔗 View</a></td>
                `;
                productList.appendChild(row);
            });

            loadingMessage.textContent = "";
        } catch (error) {
            console.error("Error fetching data:", error);
            productList.innerHTML = "<tr><td colspan='6'>⚠️ Error loading data.</td></tr>";
        }
    }

    // Cargar productos iniciales
    fetchProducts();

    // Filtrar productos por categoría
    categoryFilter.addEventListener("change", () => {
        fetchProducts(categoryFilter.value);
    });
});
