require("dotenv").config();
require("./db/conn");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const express = require("express");
const credentials = require("./middleware/credentials");

const app = express();
const port = process.env.PORT || 5000;

// cors middleware
app.use(credentials);
app.use(cors());

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
