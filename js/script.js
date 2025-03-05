const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para evitar problemas con el frontend
app.use(cors());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static("public"));

// Ruta de prueba para verificar que el servidor funciona
app.get("/api/status", (req, res) => {
    res.json({ message: "Server is running on Render!" });
});

// Ruta para manejar los productos (Ejemplo de API)
app.get("/api/products", async (req, res) => {
    try {
        // Aquí podrías conectar con una API real o base de datos
        const products = [
            { id: 1, name: "PlayStation 5", price: "$499" },
            { id: 2, name: "RTX 3060", price: "$379" },
            { id: 3, name: "iPhone 14 Pro", price: "$999" }
        ];
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
