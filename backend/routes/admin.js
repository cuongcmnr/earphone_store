const express = require('express');
const router = express.Router();
const db = require('../db');

function isAdmin(req, res, next) {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send('You must be logged in via admin');
  }
  else{
    db.get("SELECT Role FROM Users WHERE Id = ?", [user.Id], (err, row) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      if (!row || row.Role === 0) {
        return res.status(403).send('Access denied');
      }
      else{next()};
  })};
}
router.get("/whoami", (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).send(req.session.user);
  } else {
    res.status(200).send("No user is currently logged in.");
  }
});
router.get('/views', (req, res) => {
  db.all("SELECT * FROM Views", [], (err, rows) => {
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

router.put('/brands/:Id', isAdmin, (req, res) => {
  const { Name } = req.body;
  db.run("UPDATE Brand SET Name = ? WHERE Id = ?", [Name, req.params.Id], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ rowsAffected: this.changes });
  });
});

router.delete('/brands/:Id', isAdmin, (req, res) => {
  db.run("DELETE FROM Brand WHERE Id = ?", [req.params.Id], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ rowsAffected: this.changes });
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
  
router.put('/categories/:Id', isAdmin, (req, res) => {
    const { Name } = req.body;
    db.run("UPDATE Category SET Name = ? WHERE Id = ?", [Name, req.params.Id], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ rowsAffected: this.changes });
    });
});
  
router.delete('/categories/:Id', isAdmin, (req, res) => {
    db.run("DELETE FROM Category WHERE Id = ?", [req.params.Id], function(err) {
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
    const { Name, ImageUrl, CategoryId, BrandId, Description, Price } = req.body;
    db.run("INSERT INTO Products (Name, ImageUrl, CategoryId, BrandId, Description, Price) VALUES (?, ?, ?, ?)", [Name, ImageUrl, CategoryId, BrandId, Description, Price], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).send({ productId: this.lastID });
    });
});

router.put('/products/:Id', isAdmin, (req, res) => {
    const { Name, ImageUrl, CategoryId, BrandId, Description, Price } = req.body;
    db.run("UPDATE Products SET Name = ?, ImageUrl = ?, CategoryId = ?, BrandId = ?, Description = ?, Price = ? WHERE Id = ?", [Name, ImageUrl, CategoryId, BrandId, Description, Price, req.params.Id], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ rowsAffected: this.changes });
    });
});

router.delete('/products/:Id', isAdmin, (req, res) => {
    db.run("DELETE FROM Products WHERE Id = ?", [req.params.Id], function(err) {
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

router.delete('/reviews/:Id', isAdmin, (req, res) => {
    db.run("DELETE FROM Reviews WHERE Id = ?", [req.params.Id], function(err) {
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
router.put('/users/:Id', isAdmin, (req, res) => {
  const { Name, Email, Password, Role } = req.body;
  db.run("UPDATE Products SET Name = ?, Email = ?, Password = ?, Role = ? WHERE Id = ?", [Name, Email, Password, Role, req.params.Id], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ rowsAffected: this.changes });
  });
});
router.delete('/users/:Id', isAdmin, (req, res) => {
    db.run("DELETE FROM Users WHERE Id = ?", [req.params.Id], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ rowsAffected: this.changes });
    });
});
router.get('/contacts',isAdmin, (req, res) => {
  db.all("SELECT * FROM Contact", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});
router.delete('/contacts/:Id', isAdmin, (req, res) => {
  db.run("DELETE FROM Contact WHERE Id = ?", [req.params.Id], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ rowsAffected: this.changes });
  });
});
module.exports = router;
