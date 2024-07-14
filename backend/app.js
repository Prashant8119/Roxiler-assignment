/*
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sales_data';

console.log('Attempting to connect to MongoDB with URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // 5 seconds timeout
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.error('Error details:', JSON.stringify(err, null, 2));
  console.error('Please make sure MongoDB is running and accessible.');
  console.error('Connection string used:', MONGODB_URI);
  process.exit(1);
});

// Routes
app.use('/api/products', productRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

*/
//this is last modified code
/*
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const fetchAndInitializeData = require('./services/transactionService');
const transactionRoutes = require('./routes/transactionRoutes');
const cors = require('cors');

dotenv.config(); // Ensure this is at the top
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use('/api', transactionRoutes);

// Initialize database with seed data
fetchAndInitializeData();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
//this is last modified code

const express = require('express');

const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const fetchAndInitializeData = require('./services/transactionService');
const transactionRoutes = require('./routes/transactionRoutes');
const cors = require('cors');

dotenv.config(); // Ensure this is at the top
connectDB();

const app = express();
app.use(cors());
// Use CORS Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api', transactionRoutes);

// Initialize database with seed data
fetchAndInitializeData();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});