const express = require('express');
const router = express.Router();
const db = require('../db');

function isAdmin(req, res, next) {
  const user = req.session.user;
  db.get("SELECT Role FROM Users WHERE Id = ?", [user.id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (!row || row.Role !== 'admin') {
      return res.status(403).send('Access denied');
    }
    next();
  });
}

router.get('/views', isAdmin, (req, res) => {
  db.all("SELECT * FROM Views", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

router.get('/brands', isAdmin, (req, res) => {
  db.all("SELECT * FROM Category", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

router.post('/brands', isAdmin, (req, res) => {
  const { Name } = req.body;
  db.run("INSERT INTO Brand (Name) VALUES (?)", [Name], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ categoryId: this.lastID });
  });
});

router.put('/brands/:id', isAdmin, (req, res) => {
  const { Name } = req.body;
  db.run("UPDATE Brand SET Name = ? WHERE Id = ?", [Name, req.params.id], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ rowsAffected: this.changes });
  });
});

router.delete('/brands/:id', isAdmin, (req, res) => {
  db.run("DELETE FROM Brand WHERE Id = ?", [req.params.id], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ rowsAffected: this.changes });
  });
});
router.get('/categories', isAdmin, (req, res) => {
    db.all("SELECT * FROM Category", [], (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send(rows);
    });
});

router.post('/categories', isAdmin, (req, res) => {
    const { Name } = req.body;
    db.run("INSERT INTO Category (Name) VALUES (?)", [Name], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).send({ categoryId: this.lastID });
    });
});
  
router.put('/categories/:id', isAdmin, (req, res) => {
    const { Name } = req.body;
    db.run("UPDATE Category SET Name = ? WHERE Id = ?", [Name, req.params.id], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ rowsAffected: this.changes });
    });
});
  
router.delete('/categories/:id', isAdmin, (req, res) => {
    db.run("DELETE FROM Category WHERE Id = ?", [req.params.id], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ rowsAffected: this.changes });
  });
});

router.get('/products', isAdmin, (req, res) => {
    db.all("SELECT * FROM Products", [], (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send(rows);
    });
});

router.post('/products', isAdmin, (req, res) => {
    const { Name, ImageUrl, Price, CategoryId } = req.body;
    db.run("INSERT INTO Products (Name, ImageUrl, CategoryId, Price) VALUES (?, ?, ?)", [Name, ImageUrl, CategoryId, Price], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).send({ productId: this.lastID });
    });
});
  
router.put('/products/:id', isAdmin, (req, res) => {
    const { Name, ImageUrl, Price, CategoryId } = req.body;
    db.run("UPDATE Products SET Name = ?, ImageUrl = ?, CategoryId, Price = ? WHERE Id = ?", [Name, ImageUrl, Price, CategoryId, req.params.id], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ rowsAffected: this.changes });
    });
});

router.delete('/products/:id', isAdmin, (req, res) => {
    db.run("DELETE FROM Products WHERE Id = ?", [req.params.id], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ rowsAffected: this.changes });
    });
});

router.get('/reviews', isAdmin, (req, res) => {
    db.all("SELECT * FROM Reviews", [], (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send(rows);
    });
});

router.delete('/reviews/:id', isAdmin, (req, res) => {
    db.run("DELETE FROM Reviews WHERE Id = ?", [req.params.id], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ rowsAffected: this.changes });
    });
});

router.get('/users', isAdmin, (req, res) => {
    db.all("SELECT * FROM Users", [], (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send(rows);
    });
});

router.delete('/users/:id', isAdmin, (req, res) => {
    db.run("DELETE FROM Users WHERE Id = ?", [req.params.id], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ rowsAffected: this.changes });
    });
});

module.exports = router;