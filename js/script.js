document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

async function fetchProducts() {
    const productList = document.getElementById("product-list");

    try {
        const response = await fetch("/api/products"); 
        const data = await response.json();

        productList.innerHTML = ""; 

        data.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                <td>$${product.price}</td>
                <td>${product.trend}</td>
                <td>${product.stock ? "✅ In Stock" : "❌ Out of Stock"}</td>
                <td>⭐ ${product.rating}</td>
                <td><a href="${product.link}" target="_blank">🔗 View</a></td>
            `;
            productList.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading products:", error);
        productList.innerHTML = "<tr><td colspan='6'>⚠️ Error loading data.</td></tr>";
    }
}
