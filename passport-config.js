const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

function initialize(passport) {
    //functiopn to authenticate users
    const authenticateUsers = async (email, password, done) => {
        //get user by email
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: "No User found with tha email" })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Password Incorrect." })
            }
        } catch (error) {
            console.log(error)
            return done(error)
        }
    }

    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUsers))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize