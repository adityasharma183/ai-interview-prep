import express from 'express';
const authRouter = express.Router();

// Importing controllers
import { registerUser, loginUser } from '../controllers/authController.js';

/**
 * Path: /api/auth/register
 * Method: POST
 * Description: Register a new user
 */
authRouter.post('/register', registerUser);


/**
 * Path: /api/auth/login
 * Method: POST
 * Description: Login a user
 */
authRouter.post('/login', loginUser);

export default authRouter;