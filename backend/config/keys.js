let keys;

if (process.env.NODE_ENV === "production") {
  keys = {
    sqliteURI: process.env.SQLITE_URI,
  };
} else {
  keys = {
    sqliteURI: '../dev.sqlite',
  };
}

module.exports = keys;