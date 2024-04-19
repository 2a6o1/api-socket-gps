import jwt from 'jsonwebtoken';

const TOKEN_ROLE = 'transmitter';

const decodeToken = (token) => {
    if (!token) {
        throw new Error('Token is missing');
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
    } else if (!decodedToken.role.includes(TOKEN_ROLE)) {
        throw new Error('Unauthorized user');
    }
};

const authMiddleware = (io) => {
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token;

            const payload = decodeToken(token);
            validateToken(payload);

            socket.session = payload;

            next();
        } catch (err) {
            next(new Error('Authentication error' + err.message));
        }
    });
};

export default authMiddleware;
