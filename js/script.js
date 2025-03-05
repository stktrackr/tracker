document.getElementById("search-button").addEventListener("click", function() {
    const query = document.getElementById("search-input").value;
    fetch(`http://127.0.0.1:5000/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            let resultsHTML = "";
            data.forEach(product => {
                resultsHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>${product.price}</p>
                        <a href="${product.link}" target="_blank">View on Amazon</a>
                    </div>
                `;
            });
            document.getElementById("search-results").innerHTML = resultsHTML;
        })
        .catch(error => console.error("Error:", error));
});
