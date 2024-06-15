const express = require("express");
const router = express.Router();
const db = require("../db");
const { isLoggedIn } = require("./validation");

router.get("/product", (req, res) => {
  db.all("SELECT * FROM Products", (err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(products);
  });
});

router.get("/product/search/:Name", (req, res) => {
  const Name = req.params.Name;
  db.all("SELECT * FROM Products WHERE Name LIKE ?", [`%${Name}%`], (err, products) => {
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

router.post("/cart", isLoggedIn, (req, res) => {
  const { userId, productId, quantity } = req.body;
  db.run("INSERT INTO Cart (UserId, ProductId, Quantity) VALUES (?, ?, ?)", [userId, productId, quantity], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ cartId: this.lastID });
  });
});

router.delete("/cart/:Id", isLoggedIn, (req, res) => {
  const { Id } = req.params;
  db.run("DELETE FROM Cart WHERE Id = ?", [Id], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ message: "Product removed from cart" });
  });
});

router.post("/checkout", isLoggedIn, (req, res) => {
  const { userId } = req.body;
  db.get("SELECT SUM(Products.Price * Cart.Quantity) as TotalPrice FROM Cart INNER JOIN Products ON Cart.ProductId = Products.Id WHERE Cart.UserId = ?", [userId], function(err, row) {
    if (err) {
      return res.status(500).send(err.message);
    }
    const totalPrice = row.TotalPrice;
    db.run("INSERT INTO Orders (UserId, TotalPrice) VALUES (?, ?)", [userId, totalPrice], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      db.run("DELETE FROM Cart WHERE UserId = ?", [userId], function(err) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(200).send({ orderId: this.lastID });
      });
    });
  });
});

module.exports = router;