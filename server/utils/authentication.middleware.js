import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const isUser = async (req, res, next) => {
  // extract token from req.body
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");
  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized User." });
  }

  let payload;
  try {
    payload = await jwt.verify(
      token,
      "da05769bc4ee68899946ec063088388f5451a26a255caf99e7b75e677dd81936"
    );
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized User.." });
  }

  if (user.role !== "User") {
    return res.status(400).send({ message: "Unauthorized User..." });
  }

  next();
};

export const isAdmin = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");
  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized Admin." });
  }

  let payload;
  try {
    payload = await jwt.verify(
      token,
      "da05769bc4ee68899946ec063088388f5451a26a255caf99e7b75e677dd81936"
    );
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized Admin.." });
  }
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    return res.status(402).send({ message: "Unathorized Admin..." });
  }
  if (user.role !== "Admin") {
    return res.status(403).send({ message: "Unauthorized Admin...." });
  }
  next();
};
