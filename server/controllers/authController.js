const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All inputs are required" });
  }

  const duplicate = await User.findOne({ email });
  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User({
      ...req.body,
      password: hashedPassword,
    });

    const result = user.save();
    res.status(201).json({ success: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.sendStatus(401);
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const roles = Object.values(foundUser.roles);

      const accessToken = jwt.sign(
        {
          UserInfo: {
            userId: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            profilePicture: foundUser.profilePicture,
            roles: roles,
            favorites: foundUser.favorites,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ accessToken });
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
};


module.exports = { register, login };
