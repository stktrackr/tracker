async function fetchMarketData() {
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
            const price = product.price ? product.price.value : null;
            const trend = getPriceTrend(price);
            const trendIcon = trend === "up" ? "🔺" : trend === "down" ? "🔻" : "➖";
            const priceClass = trend === "up" ? "price-up" : trend === "down" ? "price-down" : "price-neutral";

            rows += `
                <tr>
                    <td><img src="${product.image}" alt="Product"></td>
                    <td>${product.title.length > 30 ? product.title.substring(0, 30) + "..." : product.title}</td>
                    <td class="${priceClass}">${product.price ? `$${product.price.value}` : "N/A"}</td>
                    <td>${trendIcon}</td>
                    <td>${product.stock_status || "In Stock"}</td>
                    <td>⭐ ${product.rating || "N/A"}</td>
                    <td><a href="${product.link}" target="_blank">🔗</a></td>
                </tr>
            `;
        });

        productTableBody.innerHTML = rows;
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("loader").innerText = "Failed to load products.";
    }
}

// Mock price trend function
let lastPrices = {};
function getPriceTrend(currentPrice) {
    if (!currentPrice) return "neutral";

    const productId = Math.random().toString(36).substr(2, 9); // Unique ID for simulation

    if (!lastPrices[productId]) {
        lastPrices[productId] = currentPrice;
        return "neutral";
    }

    let previousPrice = lastPrices[productId];
    lastPrices[productId] = currentPrice;

    if (currentPrice > previousPrice) return "up";
    if (currentPrice < previousPrice) return "down";
    return "neutral";
}

// Auto-refresh every 20 seconds
document.addEventListener("DOMContentLoaded", () => {
    fetchMarketData();
    setInterval(fetchMarketData, 20000);
});
