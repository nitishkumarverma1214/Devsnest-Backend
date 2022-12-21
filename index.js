const express = require("express");
const { connectDB } = require("./config/dbconfig");
const userRoutes = require("./routes/user");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(" app is running at PORT ", PORT);
  connectDB();
});
