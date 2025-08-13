const userModel = require("../Models/users");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.password === password) {
      // In production, use bcrypt.compare()
      const sessionId = uuidv4();
      setUser(sessionId, user);
      res.cookie("uid", sessionId, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "lax", // or 'none' if you need cross-site
      });

      return res.status(200).json({
        message: "Login successful",
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    } else {
      return res.status(401).json({
        message: "Wrong password",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new userModel({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
  signup,
};
