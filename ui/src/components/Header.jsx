import { Box, Typography } from "@mui/material";
import React from "react";
import "../App.css";

const Header = () => {
  return (
    <Box>
      <Typography variant="h5" class="Head">
        <ul
        // style={{
        //   display: "flex",
        //   gap: "2rem",
        //   listStyleType: "none",
        //   color: "white",
        //   backgroundColor: "black",
        //   margin: "0px",
        //   maxHeight: "100vh",
        //   maxWidth: "100vw",

        //   // maxWidth: "100vw",
        //   // maxHeight: "100vh",
        // }}
        >
          <li>Home</li>
          <li>Login</li>
          <li>Register</li>
        </ul>
      </Typography>
    </Box>
  );
};

export default Header;
