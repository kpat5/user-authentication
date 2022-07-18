const bodyParser = require("body-parser");
const express = require("express");
const routers = require("./router");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/", routers);

app.listen(3001, () => {
  console.log("Server is running");
});
