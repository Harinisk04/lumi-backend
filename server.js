const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();
app.use(express.json());

// Allow both local and deployed frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://lumi-frontend.up.railway.app'
];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.use('/api/items', require('./routes/items'));
app.get('/', (req, res) => res.send('Lumi API running'));

// Dynamic port
const PORT = process.env.PORT || 5000;

// 🟢 Updated log to show Railway URL
app.listen(PORT, () => {
  const baseURL = process.env.RAILWAY_URL || `http://localhost:${PORT}`;
  console.log(`✅ Server running at: ${baseURL}`);
});
