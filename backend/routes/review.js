const express = require('express');
const router = express.Router();
const db = require('../db');
const { isLoggedIn } = require("./validation");

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
  const user = req.session.user;
  db.run("INSERT INTO Reviews (ProductId, UserId, Content, Rating) VALUES (?, ?, ?, ?)", [productId, user.Id, content, rating], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ reviewId: this.lastID });
  });
});

router.put('/reviews/:Id', isLoggedIn, (req, res) => {
  const { content, rating } = req.body;
  const user = req.session.user;
  db.get("SELECT UserId FROM Reviews WHERE Id = ?", [req.params.Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (!row || row.UserId !== user.Id) {
      return res.status(403).send('You can only edit your own reviews');
    }
    else {
      db.run("UPDATE Reviews SET Content = ?, Rating = ? WHERE Id = ?", [content, rating, req.params.Id], function(err) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(200).send({ message: "Review updated" });
      })
    }
  })
});

router.delete('/reviews/:Id', isLoggedIn, (req, res) => {
  const user = req.session.user;
  db.get("SELECT UserId FROM Reviews WHERE Id = ?", [req.params.Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (!row || row.UserId !== user.Id) {
      return res.status(403).send('You can only delete your own reviews');
    }
    db.run("DELETE FROM Reviews WHERE Id = ?", [req.params.Id], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).send({ message: "Review deleted" });
    });
  });
});
router.post('/contact', (req, res) => {
  const { Cusname, Email, Feedback } = req.body;
  db.run("INSERT INTO Contact (Cusname, Email, Feedback) VALUES (?, ?, ?)", [Cusname, Email, Feedback], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ contactId: this.lastID });
  });
});
router.put('/user/:Id', isLoggedIn, (req, res) => {
  const { Email, Password } = req.body;
  const user = req.session.user;
  db.get("SELECT UserId FROM Reviews WHERE Id = ?", [req.params.Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (!row || row.UserId !== user.Id) {
      return res.status(403).send('Forbidden');
    }
    else {
      db.run("UPDATE Reviews SET Email = ?, Password = ? WHERE Id = ?", [Email, Password, req.params.Id], function(err) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(200).send({ message: "Info updated" });
      })
    }
  })
});
module.exports = router;