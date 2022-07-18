import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { Container, Button, ButtonGroup, Stack } from "@mui/material";

function Home() {
  return (
    <div className={styles.home}>
      <Container maxWidth="xs" className={styles.container}>
        <div className={styles.heading}>User Authentication</div>
        <ButtonGroup variant="outlined" className={styles.buttons}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button className={styles.button}>Login</Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button className={styles.button}>Register</Button>
          </Link>
        </ButtonGroup>
      </Container>
    </div>
  );
}
export default Home;
