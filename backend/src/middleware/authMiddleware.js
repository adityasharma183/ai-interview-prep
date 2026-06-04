import jwt from 'jsonwebtoken';
import blacklistModel from '../models/blacklistModel.js';
async function AuthMiddleware(req, res, next) {    
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    const isTokenBlacklisted = await blacklistModel.findOne({ token });
    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: 'Token has been blacklisted'
        });
    }   

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}
export default AuthMiddleware;