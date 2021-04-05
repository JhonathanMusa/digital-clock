const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/auth");
require("dotenv").config();
const dashboardRoutes = require("./routes/dashboard");
const verifyToken = require("./routes/validate-token");
const cors = require("cors");

// Capture Body
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// conexion a base de datos
const uri = `mongodb://localhost:27017/${process.env.DBNAME}`;
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(uri, option)
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db: ", e));

// import routes
app.use("/api/user", authRoutes);
// route middleware
app.use("/api/dashboard", verifyToken, dashboardRoutes);
app.get("/", (req, res) => {
  res.json({
    estado: true,
    mensaje: "funciona!",
  });
});

// Iniciar server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
