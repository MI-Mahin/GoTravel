require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const pool = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");
const authRouter = require("./routes/authRoute");
const dashboardRouter = require("./routes/dashboardRoute");

// PORT
const PORT = process.env.APP_PORT || 8000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Session
app.use(
  session({
    secret: "secretkey",
    resave: true,
    saveUninitialized: true,
  })
);

// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

// Static Files
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// Use Auth Middleware
app.use(authMiddleware);



// Route to handle booking requests
app.post("/details/:packageId", (req, res) => 
{
  const { packageId, numberOfPeople } = req.body;
  console.log(req.body);

  if (req.userInfo && req.userInfo.email) {
    console.log(req.userInfo.email);
    const user_mail = req.userInfo.email;
    const booking_date = new Date().toISOString().split("T")[0];

    const sql =
      "INSERT INTO bookings (user_mail, package_id, numberOfPeople, booking_date) VALUES ($1 , $2, $3, $4)";

    console.log("SQL Query:", sql);
    console.log("Values:", [
      user_mail,
      packageId,
      numberOfPeople,
      booking_date,
    ]);

    pool.query(
      sql,
      [user_mail, packageId, numberOfPeople, booking_date],
      (err, result) => {
        if (err) {
          console.error("Error inserting booking into database:", err);
          res
            .status(500)
            .json({ error: "An error occurred while processing your request" });
          return;
        }
      }
    );

    res.render("dashboard/bookingCompletion.ejs");
  } else {
    console.error("User information not available");
    res.status(401).json({ error: "User information not available" });
  }
});

// Routes
app.use("/auth", authRouter);
app.use("/", dashboardRouter);

app.get("/", (req, res) => {
  return res.render("root.ejs", {
    title: "Go Travel",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;
