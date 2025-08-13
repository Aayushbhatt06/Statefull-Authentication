const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRoutes');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/authtesting')
app.use(express.json()); // ✅ must be before routes
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', AuthRouter); // ✅ mount the router

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
