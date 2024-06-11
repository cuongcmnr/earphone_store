const express = require("express");
const router = express.Router();
const db = require("../db");
const crypto = require('crypto');
const { registerValidation, loginValidation } = require("../validation");

function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

router.post("/register", (req, res) => {
  const validation = registerValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error);
  }
  db.get("SELECT * FROM Users WHERE Email = ?", [req.body.email], (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (user) {
      return res.status(400).send("user exist");
    }
    const hashedPassword = hashPassword(req.body.password);
    const role = req.body.role || 'customer'; // default to 'customer' if no role is provided
    db.run("INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)", [req.body.name, req.body.email, hashedPassword, role], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).send({ user: this.lastID });
    });
  });
});

router.post("/login", (req, res) => {
  const validation = loginValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error);
  }
  db.get("SELECT * FROM Users WHERE Email = ?", [req.body.email], (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (!user) {
      return res.status(400).send({ msg: "user does not exist" });
    }
    if (hashPassword(req.body.password) === user.Password) {
      res.status(200).send({ user: user });
    } else {
      return res.status(400).send("email or password wrong");
    }
  });
});

module.exports = router;