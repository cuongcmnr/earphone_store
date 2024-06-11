const express = require('express');
const router = express.Router();
const db = require('../db');

// middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  // assuming you have some way of checking if the user is logged in, e.g. from a JWT
  const user = getCurrentUser(req);

  if (!user) {
    return res.status(401).send('You must be logged in to do that');
  }

  next();
}

router.get('/reviews/:productId', (req, res) => {
  db.all("SELECT * FROM Reviews WHERE ProductId = ?", [req.params.productId], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

router.post('/reviews', isLoggedIn, (req, res) => {
  const { productId, content, rating } = req.body;
  const user = getCurrentUser(req);

  db.run("INSERT INTO Reviews (ProductId, UserId, Content, Rating) VALUES (?, ?, ?, ?)", [productId, user.id, content, rating], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ reviewId: this.lastID });
  });
});

// ...additional routes for getting, updating, and deleting reviews...

module.exports = router;