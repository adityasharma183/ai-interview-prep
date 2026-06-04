import express from 'express';
const Router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';

// Importing controllers
import { registerUser, loginUser ,logoutUser,getMeController} from '../controllers/authController.js';

/**
 * Path: /api/auth/register
 * Method: POST
 * Description: Register a new user
 */
Router.post('/register', registerUser);


/**
 * Path: /api/auth/login
 * Method: POST
 * Description: Login a user
 */
Router.post('/login', loginUser);


/**
 * Path: /api/auth/logout
 * Method: GET
 * Description: clear the token cookie to log out the user and blacklist the token
 */
Router.get('/logout',logoutUser); 
    
/**
 * Path: /api/auth/get-me
 * Method: GET
 * Description: Get the current user's information
 */
Router.get('/get-me', authMiddleware, getMeController);
export default Router;