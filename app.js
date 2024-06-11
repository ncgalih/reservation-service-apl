const express = require('express');
const connectDB = require('./database');
const reservationRoutes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api', reservationRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Layanan Reservasi berjalan di port ${PORT}`);
});