const express = require("express");
const Product = require("../models/productModel");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get_products", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
