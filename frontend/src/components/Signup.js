import React, { useState } from "react";
import { Link } from "react-router-dom";
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

function Signup() {
  const [mes, setMsg] = useState("");
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [pass, setPass] = useState();
  const data = { name: name, email: email, password: pass };
  const handleSignup = async () => {
    const res = await axios.post("http://localhost:3001/signup", data);
    setMsg(res.data);
    console.log(mes);
    if (mes.check == true) {
      toast.success(mes.msg);
      setEmail("");
      setPass("");
      setName("");
    } else {
      toast.error(mes.msg);
    }
  };
  return (
    <div className={styles.home}>
      <Container maxWidth="xs" className={styles.container}>
        <div className={styles.loginMain}>
          <div className={styles.loginHead}>Register</div>
          <div className={styles.input}>
            <div className={styles.boxes}>
              <TextField
                id="filled-basic"
                type="text"
                placeholder="Name"
                className={styles.textIn}
                style={{ color: "white !important" }}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className={styles.boxes}>
              <TextField
                id="filled-basic"
                type="email"
                placeholder="Email"
                className={styles.textIn}
                style={{ color: "white !important" }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className={styles.boxes}>
              <TextField
                id="filled-basic"
                type="password"
                placeholder="Password"
                className={styles.textIn}
                onChange={(e) => setPass(e.target.value)}
                value={pass}
              />
            </div>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button className={styles.button} onClick={handleSignup}>
                Submit
              </Button>
            </Link>
          </div>
          <div className={styles.text}>
            Already a member?{" "}
            <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
              Login.
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default Signup;
