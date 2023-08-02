require("dotenv").config();
const { PORT } = process.env || 3001;
const express = require("express");
const cors = require("cors");
const coockieParser = require("cookie-parser");

const dbCheck = require('./db/dbCheck');
const errormiddleware = require("./middleware/error-middleware");
const testRouter = require("./routes/testRoutes.js");

const app = express();
dbCheck();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(coockieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use("/test", testRouter);

app.use(errormiddleware);

const httpServer = app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});

