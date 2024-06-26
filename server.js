require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// PORT
const PORT = process.env.APP_PORT || 8000;

// Routes
const authRouter = require('./routes/authRoute');
const dashboardRouter = require('./routes/dashboardRoute');

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);


app.use(cookieParser());
// Session
app.use(session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: true
}));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Use Routes
app.use('/auth', authRouter)
app.use('/', dashboardRouter)
app.get("/", (req, res) => {
  return res.render("root.ejs", {
    title: "Go Travel",
  });
});




app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;