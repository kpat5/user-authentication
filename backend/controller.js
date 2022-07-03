const db = require("./databaseConn");
const { signUp, login } = require("./verify");
const validate = require("express-validator");
const bcrypt = require("bcryptjs");
