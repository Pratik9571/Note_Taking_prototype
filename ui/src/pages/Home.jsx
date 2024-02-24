import { Box, Button, Typography } from "@mui/material";
import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { teal } from "@mui/material/colors";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h3" color={"black"}>
        ......This is my Homepage.....
      </Typography>
      <Button
        onClick={() => {
          navigate("/login");
        }}
        variant="contained"
        type="submit"
        color="error"
      >
        Login
      </Button>

      <Button
        onClick={() => {
          navigate("/register");
        }}
        variant="contained"
        color="error"
      >
        Register
      </Button>
    </>
  );
};

export default Home;
