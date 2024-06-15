const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbPath = './db.sqlite';
const backupPath = './db_backup.sqlite';

if (fs.existsSync(dbPath)) {
  fs.copyFileSync(dbPath, backupPath);
  console.log('Database has been backed up to db_backup.sqlite');
}
else {
  if (fs.existsSync(backupPath)) {
    fs.renameSync(backupPath, dbPath);
    console.log('Backup file has been renamed to db.sqlite');
  }
  else {
    console.log('No database file found, a new one will be created.');
  }
}

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
  Role BOOLEAN NOT NULL DEFAULT 0,
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

db.run(`CREATE TABLE IF NOT EXISTS Cart (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  UserId INTEGER NOT NULL,
  ProductId INTEGER NOT NULL,
  Quantity INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(UserId) REFERENCES Users(Id),
  FOREIGN KEY(ProductId) REFERENCES Products(Id)
)`);

db.run(`CREATE TABLE IF NOT EXISTS Orders (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  UserId INTEGER NOT NULL,
  TotalPrice REAL NOT NULL,
  Date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(UserId) REFERENCES Users(Id)
)`);

module.exports = db;
