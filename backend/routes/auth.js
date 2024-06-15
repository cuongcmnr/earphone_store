const express = require("express");
const router = express.Router();
const db = require("../db");
const crypto = require('crypto');
const { registerValidation, loginValidation } = require("./validation");

function hashPassword(Password) {
  const hash = crypto.createHash('sha256');
  hash.update(Password);
  return hash.digest('hex');
}

router.post("/register", (req, res) => {
  const validation = registerValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error);
  }
  db.get("SELECT * FROM Users WHERE Email = ?", [req.body.Email], (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (user) {
      return res.status(400).send("user exist");
    }
    const hashedPassword = hashPassword(req.body.Password);
    const role = req.body.Role || 0;
    db.run("INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)", [req.body.Name, req.body.Email, hashedPassword, role], function(err) {
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
  db.get("SELECT * FROM Users WHERE Email = ?", [req.body.Email], (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (!user) {
      return res.status(400).send({ msg: "user does not exist" });
    }
    if (hashPassword(req.body.Password) === user.Password) {
      req.session.user = user;
      res.status(200).send({ user: user });
    } else {
      return res.status(400).send("Email or Password wrong");
    }
  });
});
router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ msg: "Logged out" });
  });
});
router.get("/whoami", (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).send(req.session.user);
  } else {
    res.status(200).send("No user is currently logged in.");
  }
});
module.exports = router;
