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
        return res.send({
          check: false,
          msg: "This email already has an account!",
        });
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
              .send({ check: true, msg: "This user has been registered!!!" });
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
      // console.log(req.body.email);
      if (err) {
        return res.status(400).send({ msg: err });
      }
      if (!result.length) {
        return res.send({ msg: "false" });
      }
      bcrypt.compare(req.body.password, result[0]["password"], (err, ress) => {
        if (err) {
          return res.send({ msg: "false" });
        }
        if (ress) {
          return res.status(200).send({ msg: "true" });
        }
      });
    }
  );
});

router.post("/getData", (req, res) => {
  db.query(
    `SELECT * FROM users WHERE email=${db.escape(req.body.email)}`,
    (err, result) => {
      console.log(req.body.email);
      if (err) {
        return res.status(400).send({ msg: "errrr" });
      }
      return res.status(200).send(result);
    }
  );
});

module.exports = router;
