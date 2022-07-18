import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { toast } from "react-toastify/dist/react-toastify";

function Info(props) {
  let nav = useNavigate();
  const location = useLocation();
  // console.log("loca", location);
  const id = location.state.id;
  const name = location.state.name;
  const email = location.state.email;
  const handleSubmit = () => {
    props.setAuthFunc(false);
    toast.success("You have been logged out!!!");
    nav("/login", { replace: true });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hi {name}
          </Typography>
          <Button color="inherit" onClick={handleSubmit}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className={styles.info}>
        <h1>Info:</h1>
        ID:{id}
        <br />
        Name:{name}
        <br />
        Email:{email}
        <br />
      </div>
    </Box>
  );
}
export default Info;
