const express = require("express");
const shortRoutes = require("./routes/shortRoutes");
const homeRoutes = require("./routes/homeRoutes");
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/shorturl", shortRoutes);
app.use("/", homeRoutes);
app.listen(PORT, () => {
  console.log("app is listening at port", 3000);
});
