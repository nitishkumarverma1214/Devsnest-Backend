const express = require("express");
const { connectDB } = require("./config/dbconfig");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("content"));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(" app is running at PORT ", PORT);
  connectDB();
});
