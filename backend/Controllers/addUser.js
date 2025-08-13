const userModel = require('../Models/users');

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new userModel({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = addUser;