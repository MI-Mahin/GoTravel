const formidable = require('formidable');
const pool = require('../config/db');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


class AuthController {

    renderRegisterPage = (req, res) => {
        const { crudToken } = req.cookies;
        if (crudToken) {
            return res.status(200).redirect('/dashboard');
        } else {
            return res.render('auth/register.ejs', {
                title: 'Register',
                error: ''
            });
        }
    }


    renderLoginPage = (req, res) => {
        const { crudToken } = req.cookies;
        if (crudToken) {
            return res.status(200).redirect('/dashboard');
        } else {
            return res.render('auth/login.ejs', {
                title: 'Login',
                error: ''
            });
        }
    }


    registerUser = async (req, res) => {
        const form = new formidable.IncomingForm();
    
        try {
            // Parse the form data
            const { fields } = await new Promise((resolve, reject) => {
                form.parse(req, (err, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ fields });
                    }
                });
            });
    
            const { name, email } = fields;
    
            // Check if email already exists
            const emailCheckQuery = `SELECT COUNT(*) AS count FROM users WHERE email = '${email}'`;
            const emailExistsResult = await pool.query(emailCheckQuery);
            const emailExists = emailExistsResult.rows[0].count > 0;
            if (emailExists) {
                return res.status(400).render('auth/register.ejs', {
                    title: 'Register',
                    error: 'Email already exists'
                });
            }
    
            // Insert user into the database with only name and email
            const insertQuery = `INSERT INTO users (name, email) VALUES  ('${name}', '${email}')`;
            await pool.query(insertQuery);
    
            // Create session or JWT token with name and email
            const token = jwt.sign({
                name: name,
                email: email
            }, 'secretkey', {
                expiresIn: '2d'
            });
    
            // Set the token in cookies
            res.cookie('crudToken', token, {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            });
    
            // Redirect to dashboard
            return res.status(200).redirect('/dashboard');
    
        } catch (error) {
            return res.status(500).render('dashboard/error.ejs', {
                status: 500,
                title: 'Error',
                message: 'Internal server error',
                error: error
            });
        }
    };
    
    


    loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            const stringPassword = String(password);

            const userQuery = `SELECT * FROM users WHERE email = '${email}'`;
            const userResult = await pool.query(userQuery);
            const user = userResult.rows[0];

            if (!user) {
                return res.status(400).render('auth/login', {
                    title: 'Login',
                    error: 'User not found'
                });
            }

            const passwordMatch = await bcrypt.compare(stringPassword, user.password);

            if (!passwordMatch) {
                return res.status(400).render('auth/login', {
                    title: 'Login',
                    error: 'Invalid password'
                });
            }

            const token = jwt.sign({
                id: user.user_id,
                email: user.email,
                img_url: user.img_url
            }, 'secretkey', {
                expiresIn: '2d'
            });

            res.cookie('crudToken', token, {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            });

            return res.status(200).redirect('/dashboard');

        } catch (error) {
            return res.status(500).render('dashboard/error.ejs', {
                status: 500,
                title: 'Error',
                message: 'Internal server error',
                error: error
            });
        }
    };


    logoutUser = (req, res) => {
        res.clearCookie('crudToken');
        return res.status(200).redirect('/auth/login');
    }


}

module.exports = new AuthController();