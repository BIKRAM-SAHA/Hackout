const express = require("express");
const cors = require("cors");
const axios = require('axios')
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const routes=require('./Router/routes')
const password='MamaLearnz'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createRoutes=require('./Router/createRoutes')
var bodyParser = require('body-parser')

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(express.json()); //convert all incoming requests to json
app.use(cors({ credentials: true })); //abiding by cors policy

app.use("/", routes,createRoutes);

app.listen(port, () => {
  console.log("Server established at port ", port);
});
