import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const MainLayouts = () => {
  return (
    <Box>
      <Header />

      <Outlet></Outlet>

      <Footer />
    </Box>
  );
};

export default MainLayouts;
