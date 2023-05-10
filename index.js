const express = require("express");
const app = express();
const dbConnect = require("./db/dbConnect");
require("dotenv").config();
const PORT = process.env.PORT;

dbConnect();
app.use(express.json());

// app routes ---------------
app.get("/", (_, res) => {
  res.json({
    message: "base route of the application",
  });
});

// app.use("/ghg-emissions", ghgEmissionsRoute);

app.listen(5000, () => {
  console.log(`Listening on port ${PORT}...`);
});
