import bcrypt from "bcrypt";

export const getHashPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  return hashedPassword;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  const isPasswordmatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isPasswordmatch;
};
