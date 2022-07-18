import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import {
  TextField,
  Button,
  ButtonGroup,
  Stack,
  Container,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify/dist/react-toastify";

function Login(props) {
  let nav = useNavigate();
  const [mes, setMsg] = useState("");
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  var data = { email: email, password: pass };
  var mail = { email: email };
  const handleLogin = async () => {
    const res = await axios.post("http://localhost:3001/login", data);
    setMsg(res.data);
    console.log("login", res);
    if (mes.msg == "false") {
      toast.error("Email or password is incorrect");
    } else if (mes.msg == "true") {
      toast.success("You have been logged in!!!");
      props.setAuthFunc(true);
      const d = await axios.post("http://localhost:3001/getData", mail);
      // console.log("gett", d.data[0].id);
      nav(
        `/info/${d.data[0].id}`,
        {
          state: {
            id: d.data[0].id,
            name: d.data[0].name,
            email: d.data[0].email,
          },
        },
        { replace: true }
      );
    }
  };
  return (
    <div className={styles.home}>
      <Container maxWidth="xs" className={styles.container}>
        <div className={styles.loginMain}>
          <div className={styles.loginHead}>Login</div>
          <div className={styles.input}>
            <div className={styles.boxes}>
              <TextField
                id="filled-basic"
                type="email"
                placeholder="Email"
                className={styles.textIn}
                style={{ color: "white !important" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.boxes}>
              <TextField
                id="filled-basic"
                type="password"
                placeholder="Password"
                className={styles.textIn}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            {/* <Link to="/login" style={{ textDecoration: "none" }}> */}
            <Button className={styles.button} onClick={handleLogin}>
              Submit
            </Button>
            {/* </Link> */}
          </div>
          <div className={styles.text}>
            Not a member?{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "blue" }}
            >
              Register now.
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default Login;
