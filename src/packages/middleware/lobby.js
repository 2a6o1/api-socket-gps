import { v4 as uuidv4 } from 'uuid';

const lobbyMiddleware = (socket, next) => {
    const role = socket.session.token.role;

    if (role !== 'device') {
        const roomId = socket.handshake.auth.roomId;
        if (!roomId) {
            next(new Error('roomId is missing'));
        }

        next()
    }

    socket.handshake.auth.roomId = uuidv4();
    next();
}

export default lobbyMiddleware;