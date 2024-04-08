//importing libraries using npm
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const  pool  = require("./dbConfig");
//const Pool  = require("pg").Pool;

dotenv.config();


initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);


const users = []

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())


//configuring the login post functionalities
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));



// Route to handle registration form submission
app.post('/register', async (req, res) => {
    const { name, email, password, role, passportNumber, nationality, hotelName, hotelLocation, experienceYears, spokenLanguages } = req.body;

    try {
        // Insert user information into the users table
        const userQuery = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id';
        const userValues = [name, email, password];
        const { rows } = await pool.query(userQuery, userValues);
        const userId = rows[0].id;

        // Insert additional information based on the user's role
        switch (role) {
            case 'traveler':
                await pool.query('INSERT INTO travelers (user_id, passport_number, nationality) VALUES ($1, $2, $3)', [userId, passportNumber, nationality]);
                break;
            case 'hotel_manager':
                await pool.query('INSERT INTO hotel_managers (user_id, hotel_name, hotel_location) VALUES ($1, $2, $3)', [userId, hotelName, hotelLocation]);
                break;
            case 'tour_guide':
                await pool.query('INSERT INTO tour_guides (user_id, experience_years, spoken_languages) VALUES ($1, $2, $3)', [userId, experienceYears, spokenLanguages]);
                break;
            default:
                throw new Error('Invalid role');
        }

        res.send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('An error occurred while registering the user');
    }
});

//routes
app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/login', (req, res) => {
    res.render("login.ejs")
})

app.get('/register', (req, res) => {
    res.render("register.ejs")
})


//end routes


app.listen(3000, () => {
    console.log("Server started on port 3000")
})