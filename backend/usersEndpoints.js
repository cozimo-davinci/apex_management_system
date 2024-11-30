const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models/users.model');
const swagger = require('./swagger_setup.js')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDocumentation = swaggerJsDoc(swagger);
const swaggerUI = require('swagger-ui-express');

const generateToken = require('./jwtUtils.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.JWT_SECRET || "fallbackSecretKey";

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer Token

        jwt.verify(token, secretKey, (err, payload) => {
            if (err) {
                return res.sendStatus(403).json({
                    success: false,
                    message: "Invalid Token",
                }); // Forbidden
            } else {
                req.user = payload;
                next();
            }

        });
    } else {
        res.sendStatus(401).json({
            success: false,
            message: "Token is not provided",
        }); // Unauthorized
    }
};




/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email already exists or missing required fields
 *       500:
 *         description: Internal server error
 */

router.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ success: false, message: 'Email, username, and password are required' });
        }

        const lowerCaseEmail = email.toLowerCase();

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email: lowerCaseEmail });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        // // Hash password before saving
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            email: lowerCaseEmail,
            username,
            password,
        });

        // Respond with success (no token required yet)
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                hashedPassword: newUser.password
            },
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});


/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const lowerCaseEmail = email.toLowerCase();
        const user = await User.findOne({ email: lowerCaseEmail });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        // Compare the hashed password with the user's input
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // Log password from request and stored hash
        console.log('Password from request:', password);
        console.log('Stored password hash:', user.password);

        console.log('Password comparison result:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }
        // Generate JWT Token
        const { accessToken, refreshToken } = generateToken(user);

        res.status(200).json({
            message: 'Login successful',
            success: true,
            accessToken,
            refreshToken,

        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


/**
 * @swagger
 * /api/v1/user/refresh-token:
 *   post:
 *     summary: Refresh an access token
 *     description: This endpoint allows the user to refresh their access token using a valid refresh token. The new access token will be valid for a specified period.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token provided during login.
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The newly generated access token.
 *       401:
 *         description: Refresh token is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Refresh Token is missing"
 *       403:
 *         description: Invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid refresh token"
 *       500:
 *         description: Internal server error
 */

router.post('/refresh-token', (req, res) => {
    const { refreshToken } = req.body;
    const refreshSecretKey = process.env.JWT_REFRESH_SECRET || 'fallbackRefreshSecretKey';

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh Token is missing" });

    }

    // Verify refresh token
    jwt.verify(refreshToken, refreshSecretKey, (error, user) => {
        if (error) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Generate new access token
        const accessToken = jwt.sign({
            id: user.id,
            email: user.email,
        }, refreshSecretKey, { expiresIn: '7d' });
        res.status(200).json({ accessToken });
    });


});

module.exports = router;