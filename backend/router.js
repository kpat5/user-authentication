const express = require("express");
const router = express.Router();
const db = require("./databaseConn");
const { signUp, login } = require("./verify");
const validate = require("express-validator");
const bcrypt = require("bcryptjs");

router.post("/signup", signUp, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email)=LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length) {
        return res
          .status(409)
          .send({ msg: "This email already has an account!" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({ msg: err });
          } else {
            db.query(
              `INSERT INTO users (name,email,password) VALUES ('${
                req.body.name
              }',${db.escape(req.body.email)},${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  return res.status(400).send({ msg: err });
                }
              }
            );
            return res
              .status(201)
              .send({ msg: "This user has been registered!!!" });
          }
        });
      }
    }
  );
});

router.post("/login", login, (req, res) => {
  db.query(
    `SELECT * FROM users WHERE email=${db.escape(req.body.email)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      if (!result.length) {
        return res.status(401).send({ msg: "Email or password is incorrect" });
      }
      bcrypt.compare(req.body.password, result[0]["password"], (err, ress) => {
        if (err) {
          return res
            .status(401)
            .send({ msg: "Email or password is incorrect" });
        }
        if (ress) {
          return res.status(200).send({ msg: "Logged In!!!" });
        }
      });
    }
  );
});

module.exports = router;
