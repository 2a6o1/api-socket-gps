import jwt from 'jsonwebtoken';

const decodeToken = (token) => {
    if (!token) {
        new Error('Token is missing');
    }

    const decoded = jwt.verify(token, 'your_secret_key');
    if (!decoded) {
        throw new Error('Invalid token');
    }

    return decoded;
};

const validateToken = (decodedToken) => {
    if (!decodedToken.id) {
        throw new Error('Missing Id in token');
    }

    if (!decodedToken.exp) {
        throw new Error('Missing expiration date in token');
    }

    if (decodedToken.exp < Date.now() / 1000) {
        throw new Error('Token expired');
    }

    if (!decodedToken.companyId) {
        throw new Error('Missing companyId in token');
    }

    if (!decodedToken.role) {
        throw new Error('Missing roles in token');
    }

    if (!decodedToken.vehicularUnit) {
        throw new Error('Missing vehicularUnit in token');
    }

    if (!decodedToken.deviceId) {
        throw new Error('Missing transmitterId in token');
    }
};

const authMiddleware = (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        const payload = decodeToken(token);
        validateToken(payload);

        socket.session.payload = payload;

        next();
    } catch (err) {
        next(new Error('Authentication error: ' + err.message));
    }
};

export default authMiddleware;
