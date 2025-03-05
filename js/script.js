async function fetchAllProducts() {
    const API_KEY = "53C09080269C4EFB88ECE212F519E7E4"; 
    const BASE_URL = `https://api.rainforestapi.com/request?api_key=${API_KEY}&type=search&amazon_domain=amazon.com&search_term=top+products`;

    document.getElementById("loader").style.display = "block";

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        const productTableBody = document.querySelector("#product-table tbody");

        document.getElementById("loader").style.display = "none";

        if (!data.search_results || data.search_results.length === 0) {
            productTableBody.innerHTML = "<tr><td colspan='7'>No products available.</td></tr>";
            return;
        }

        let rows = "";
        data.search_results.forEach((product) => {
            rows += `
                <tr>
                    <td><img src="${product.image}" alt="Product"></td>
                    <td>${product.title.length > 30 ? product.title.substring(0, 30) + "..." : product.title}</td>
                    <td>${product.price ? `$${product.price.value}` : "N/A"}</td>
                    <td>${product.stock_status || "In Stock"}</td>
                    <td>⭐ ${product.rating || "N/A"}</td>
                    <td>${new Date().toLocaleDateString()}</td>
                    <td><a href="${product.link}" target="_blank">View</a></td>
                </tr>
            `;
        });

        productTableBody.innerHTML = rows;
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("loader").innerText = "Failed to load products.";
    }
}

// Ejecutar la carga de productos y actualizar cada 30 segundos
document.addEventListener("DOMContentLoaded", () => {
    fetchAllProducts();
    setInterval(fetchAllProducts, 30000); // Actualiza cada 30 segundos
});
