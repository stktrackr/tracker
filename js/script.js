async function fetchProducts() {
    try {
        const response = await fetch("https://your-render-app.onrender.com/api/products"); // REEMPLAZAR con la URL de Render
        const data = await response.json();

        const productList = document.getElementById("product-list");
        productList.innerHTML = "";

        data.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>📉 Up/Down</td>
                <td>${product.stock}</td>
                <td>⭐ ${product.rating}</td>
                <td><a href="${product.link}" target="_blank">🔗 Amazon</a></td>
            `;
            productList.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("product-list").innerHTML = "<tr><td colspan='6'>Error loading data.</td></tr>";
    }
}

// Cargar los productos al iniciar la página
document.addEventListener("DOMContentLoaded", fetchProducts);
