import { verifyToken } from "../utils/token.js";

export const middlewareAuth = async (socket, next) => {
    
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Token missing'));
    try {
        const isValid = await verifyToken(token)
        if (!isValid) return next(new Error('Token not validate'));
        next();
    } catch (err) {
        next(new Error('Invalid token'));
    }
}