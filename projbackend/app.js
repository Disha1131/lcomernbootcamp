require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cool = require("cool-ascii-faces");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");

// app.get("../", function (request, response) {
//   response.sendFile(__dirname + "/projfrontend/index.html");
// });

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);

//heroku

const path = require("path");

// app.use(express.static(path.join(__dirname, "../projfrontend/build")));

// app.get("/", (req, res) => {
//   return res.sendFile(
//     path.join(__dirname, "..", "projfrontend", "build", "index.html")
//   );
//   return res.send("../projfrontend/build/index.html");
// });

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("../projfrontend/build"));
}
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "..", "..", "projfrontend", "build", "index.html")
//   );
// res.sendFile("index.html", {
//   root: path.join(__dirname, "../projfrontend/public"),
// });
// });

// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../projfrontend/public", "index.html"));
// });

// express()
//   .use(express.static(path.join(__dirname, "public")))
//   .set("views", path.join(__dirname, "views"))
//   .set("view engine", "ejs")
//   .get("/", (req, res) => res.render("pages/index"))
//   .get("/cool", (req, res) => res.send(cool()));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../projfrontend/build")));

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../projfrontend/build/index.html"));
});

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
