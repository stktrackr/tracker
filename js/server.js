const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para obtener datos desde la API
app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get('URL_DE_LA_NUEVA_API_AQUI');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error retrieving data' });
    }
});

// Ruta para verificar que el servidor corre bien
app.get('/', (req, res) => {
    res.send('🚀 Price Tracker API is running!');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
