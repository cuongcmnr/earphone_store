const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});
db.run(`CREATE TABLE IF NOT EXISTS Category (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT NOT NULL
)`);
db.run(`CREATE TABLE IF NOT EXISTS Brand (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT NOT NULL
)`);
db.run(`CREATE TABLE IF NOT EXISTS Products (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT NOT NULL,
  ImageUrl TEXT NOT NULL,
  CategoryId INTEGER NOT NULL,
  BrandId INTEGER NOT NULL,
  Price TEXT,
  FOREIGN KEY(CategoryId) REFERENCES Category(Id),
  FOREIGN KEY(BrandId) REFERENCES Brand(Id)
)`);

db.run(`CREATE TABLE IF NOT EXISTS Users (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT NOT NULL,
  Email TEXT NOT NULL UNIQUE,
  Password TEXT NOT NULL,
  Role TEXT NOT NULL DEFAULT 'customer',
  Date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`);

db.run(`CREATE TABLE IF NOT EXISTS Views (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Page TEXT NOT NULL,
  Count INTEGER NOT NULL DEFAULT 0
)`);

db.run(`CREATE TABLE IF NOT EXISTS Reviews (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  ProductId INTEGER NOT NULL,
  UserId INTEGER NOT NULL,
  Content TEXT NOT NULL,
  Rating INTEGER NOT NULL,
  Date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(ProductId) REFERENCES Products(Id),
  FOREIGN KEY(UserId) REFERENCES Users(Id)
)`);
module.exports = db;
