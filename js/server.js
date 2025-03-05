const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para evitar problemas con el frontend
app.use(cors());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static("public"));

// Ruta de prueba para verificar que el servidor funciona
app.get("/api/status", (req, res) => {
    res.json({ message: "Server is running on Render!" });
});

// Ruta para manejar los productos (Ejemplo de API con datos de prueba)
app.get("/api/products", async (req, res) => {
    try {
        const products = [
            { id: 1, name: "PlayStation 5", price: "$499", rating: "4.8", stock: "In Stock", link: "https://amazon.com/ps5" },
            { id: 2, name: "RTX 3060", price: "$379", rating: "4.5", stock: "In Stock", link: "https://amazon.com/rtx3060" },
            { id: 3, name: "iPhone 14 Pro", price: "$999", rating: "4.7", stock: "Out of Stock", link: "https://amazon.com/iphone14" }
        ];
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
});

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
