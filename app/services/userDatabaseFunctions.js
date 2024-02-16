import bcrypt from "bcryptjs";
import User from "../models/accounts.js";

// return await rule deprecated in ESLint
const findUser = async (username) => await User.findOne({ username });

const userExists = async (username) => {
  const user = await User.findOne({ username });

  try {
    if (user != null) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

const createUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return new User({ username, password: hashedPassword }).save();
  } catch (error) {
    console.log(error);
  }
};

export { findUser, userExists, createUser };