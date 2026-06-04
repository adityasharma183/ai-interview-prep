import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import blacklistModel from '../models/blacklistModel.js';

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error'
        });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error'
        });
    }
}


/**
 * Path: /api/auth/logout
 * Method: GET
 * Description: clear the token cookie to log out the user and blacklist the token      
 */


async function logoutUser(req, res) {
    try {
        console.log('Cookies:', req.cookies);

        const token = req.cookies?.token;

        if (!token) {
            return res.status(400).json({
                message: 'No token found'
            });
        }

        const blacklistedToken = await blacklistModel.create({
            token
        });

        console.log('Blacklisted:', blacklistedToken);

        res.clearCookie('token');

        return res.status(200).json({
            message: 'User logged out successfully'
        });

    } catch (error) {
        console.error('Error logging out user:', error);

        return res.status(500).json({
            message: 'Server error'
        });
    }
}

/**
 * Path: /api/auth/get-me
 * Method: GET
 * Description: Get the current user's information
 */

async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'User information retrieved successfully',
            user:{
                id: user._id,
                username: user.username,
                email: user.email   
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error'
        });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getMeController
};