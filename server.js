const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();
app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use('/api/items', require('./routes/items'));
app.get('/', (req, res) => res.send('Lumi API running'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
