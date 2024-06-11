const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/product", (req, res) => {
  db.all("SELECT * FROM Products", (err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(products);
  });
});
router.get("/product/search/:name", (req, res) => {
  const name = req.params.name;
  db.all("SELECT * FROM Products WHERE Name LIKE ?", [`%${name}%`], (err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(products);
  });
});
router.get("/category", (req, res) => {
  db.all("SELECT * FROM Category", (err, categories) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(categories);
  });
});
router.get("/brand", (req, res) => {
  db.all("SELECT * FROM Brand", (err, categories) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(categories);
  });
});
module.exports = router;
