import express from "express";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "../validation/user.validation.js";
import User from "../model/user.model.js";
import { getHashPassword } from "../utils/password.function.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//  register User
router.post(
  "/user/register",
  async (req, res, next) => {
    // extract user from req.body
    const newUser = req.body;
    // validate
    try {
      const validatedUser = await registerUserValidationSchema.validate(
        newUser
      );
      req.body = validatedUser;
      next();
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract new user from req.body
    const newUser = req.body;
    // find user with email
    const user = await User.findOne({ email: newUser.email });
    // if user, throw error
    if (user) {
      return res.status(402).send({ message: "User already exists." });
    }
    // hash password
    const hashedPassword = await getHashPassword(newUser.password);
    // create user
    newUser.password = hashedPassword;
    await User.create(newUser);
    // send response
    return res.status(201).send({ message: "User is created successfully" });
  }
);

// for login user
router.post(
  "/user/login",
  async (req, res, next) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;
    // validate the login Credentials
    try {
      const validatedData = await loginUserValidationSchema.validate(
        loginCredentials
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(403).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract login credentials from req.body
    console.log("body: ", req.body);
    const { email, password } = req.body;
    // find user with email
    const user = await User.findOne({ email });
    // if not user, throw error
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    //  check for password match
    const isPasswordmatch = await bcrypt.compare(password, user.password);
    // if not password match, throw error
    if (!isPasswordmatch) {
      return res.status(404).send({ message: "Email/Password doesn't match." });
    }
    // generate token
    const token = jwt.sign(
      { email: user.email },
      "da05769bc4ee68899946ec063088388f5451a26a255caf99e7b75e677dd81936"
    );
    // send response
    return res
      .status(201)
      .send({ message: "Login Successful.", user: user, token: token });
  }
);

export default router;
