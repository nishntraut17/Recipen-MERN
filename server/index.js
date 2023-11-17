require("dotenv").config();
require("./db/conn");
const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

// cors middleware

app.use(cors({
  origin: ['https://recipen-mern.netlify.app', 'https://recipen-mern-backend-ibfb.onrender.com/', 'http://localhost:5173'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// route middleware
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/recipe", require("./routes/recipeRoutes"));
app.use("/api/blog", require("./routes/blogRoutes"));

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
