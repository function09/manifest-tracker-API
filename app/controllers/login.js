import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUser, userExists } from "../services/userDatabaseFunctions.js";
import "dotenv/config";

const loginController = async (req, res) => {
  const { TOKEN_SECRET } = process.env;
  try {
    const user = await findUser(req.body.username);

    if (!(await userExists(req.body.username))) {
      return res.status(422).json({ message: "Username or password is incorrect." });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Incorrect credentials." });
    }

    // Can still use key after relogging - curious about this
    const token = jwt.sign({ user: req.body.username }, TOKEN_SECRET, { expiresIn: "8h" });

    return res.status(200).json({ message: `User, ${user.username}, signed on successfully.`, token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default loginController;
