const express = require('express');
const router = express.Router();

// Import your individual route handlers
const userRoutes = require('./userRoutes');
const productsRoutes = require('./productsRoutes');
const todoRoutes = require('./todoRoutes');

// Use the routes
router.use('/users', userRoutes);
router.use('/products', productsRoutes);
router.use('/todos', todoRoutes);

module.exports = router;
