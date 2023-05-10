const express = require("express");
const app = express();
const dbConnect = require("./db/dbConnect");
require("dotenv").config();
const PORT = process.env.PORT;
const ordersRoute = require("./routes/order");

dbConnect();
app.use(express.json());

// app routes ---------------
app.get("/", (_, res) => {
  res.json({
    message: "base route of the application",
  });
});

app.use("/orders", ordersRoute);

app.listen(5000, () => {
  console.log(`Listening on port ${PORT}...`);
});
