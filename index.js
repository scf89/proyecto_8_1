require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/api/routes/userRoutes');
const coworkingRoutes = require('./src/api/routes/coworkingRoutes');
const reservationRoutes = require('./src/api/routes/reservationRoutes');
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const cloudinary = require("cloudinary").v2;

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY
})

app.use(express.json());

app.use(cors());

connectDB();

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/coworking', coworkingRoutes);
app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
