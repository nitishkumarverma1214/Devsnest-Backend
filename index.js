const express = require("express");
const { connectDB } = require("./config/dbconfig");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
require("dotenv").config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "photo store api",
      version: "1.0.0",
      description: "Buy/sell photos",
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};

const spec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spec));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("content"));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(" app is running at PORT ", PORT);
  connectDB();
});
