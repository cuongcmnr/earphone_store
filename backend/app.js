const express = require("express");
const PORT = process.env.PORT || 5002;
const app = express();
require("./db");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const reviewRoute = require("./routes/review");
const path = require("path");
/************ MIDDLEVARES *************/

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add headers in order to perform all operation on API
// Because CORS Thing (Google it if you do not know)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "*");

  next();
});
/************ ROUTES *************/
app.use("/api/product", productRoute);
app.use("/api/user", authRoute);
app.use("/api/admin", admin);
app.use("/api/review", review);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}
// listen to the port
app.listen(PORT);
