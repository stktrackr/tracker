const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API de MercadoLibre (puedes cambiar "MLA" para otro país)
const BASE_URL = "https://api.mercadolibre.com/sites/MLA/search?q=";

// Ruta principal (verificar que el servidor está corriendo)
app.get('/', (req, res) => {
    res.send('🚀 Price Tracker API is running with real data!');
});

// Ruta para obtener productos reales de MercadoLibre
app.get('/api/products', async (req, res) => {
    try {
        const { category } = req.query; // Obtener categoría desde la URL
        const query = category ? category : "laptops"; // Laptops por defecto

        const response = await axios.get(`${BASE_URL}${query}`);
        const products = response.data.results.map(product => ({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.thumbnail,
            stock: product.available_quantity > 0,
            url: product.permalink
        }));

        res.json(products);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Error retrieving data" });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
