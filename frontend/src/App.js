import "./App.css";
import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Info from "./components/Info";
import { ToastContainer } from "react-toastify/dist/react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [auth, setAuth] = useState(false);
  const setAuthFunc = (val) => {
    setAuth(val);
    console.log(auth);
  };
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login setAuthFunc={setAuthFunc} />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="info/:id"
          element={
            auth ? (
              <Info setAuthFunc={setAuthFunc} />
            ) : (
              <Login setAuthFunc={setAuthFunc} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
