const userModel = require('../Models/users');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    if (user.password === password) { // In production, use bcrypt.compare()
      return res.status(200).json({
        message: "Login successful",
        success: true,
        data: {
          name: user.name,
          email: user.email
        }
      });
    } else {
      return res.status(401).json({
        message: "Wrong password",
        success: false
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message
    });
  }
};

module.exports = login;
