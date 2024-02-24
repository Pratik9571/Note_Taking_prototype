import { Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import "../App.css";
import { Formik } from "formik";
const Login = () => {
  return (
    <Formik >
      <Typography variant="h3" color={"black"}>
        ......This is my Login.....
      </Typography>
    </Formik>
  );
};

export default Login;
