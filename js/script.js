async function fetchAllProducts() {
    const API_KEY = "53C09080269C4EFB88ECE212F519E7E4"; 
    const BASE_URL = `https://api.rainforestapi.com/request?api_key=${API_KEY}&type=search&amazon_domain=amazon.com&search_term=top+products`;

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        const productTableBody = document.querySelector("#product-table tbody");

        if (!data.search_results || data.search_results.length === 0) {
            productTableBody.innerHTML = "<tr><td colspan='8'>No products available.</td></tr>";
            return;
        }

        let rows = "";
        data.search_results.forEach((product) => {
            rows += `
                <tr>
                    <td><img src="${product.image}" alt="${product.title}"></td>
                    <td>${product.title}</td>
                    <td>${product.category || "Unknown"}</td>
                    <td>${product.price ? `$${product.price.value}` : "Not Available"}</td>
                    <td>${new Date().toLocaleDateString()}</td>
                    <td>${product.stock_status || "In Stock"}</td>
                    <td>⭐ ${product.rating || "N/A"}</td>
                    <td><a href="${product.link}" target="_blank">View on Amazon</a></td>
                </tr>
            `;
        });

        productTableBody.innerHTML = rows;
    } catch (error) {
        console.error("Error fetching all products:", error);
    }
}

// Ejecutar la carga de productos al iniciar la página
document.addEventListener("DOMContentLoaded", fetchAllProducts);
