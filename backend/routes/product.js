const express = require("express");
const router = express.Router();
const db = require("../db");
function isLoggedIn(req, res, next) {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send('You must be logged in to do that');
  }
  next();
}

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

router.post("/cart", isLoggedIn, (req, res) => {
  const { userId, productId, quantity } = req.body;
  db.run("INSERT INTO Cart (UserId, ProductId, Quantity) VALUES (?, ?, ?)", [userId, productId, quantity], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ cartId: this.lastID });
  });
});

router.delete("/cart/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM Cart WHERE Id = ?", [id], function(err) {
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
