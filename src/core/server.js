import { Server as WebSocketServer } from 'socket.io';
import RoomManager from 'src/packages/rooms/manager';
import WebSocketController from 'src/internal/modules/client/interactors/handlers';
import AuthMiddleware from 'src/packages/middleware/auth';
import { Server } from "socket.io";


const newServer = (
    roomManager,
    socketHandler,
    {
        port,
        ip,
        middlewares = [],
    }) => {
    const io = new Server({ /* options */ });
    // Apply additional middlewares
    middlewares.forEach(middleware => io.use(middleware));

    // Configure Socket.IO connection handler
    io.on('connection', (socket) => {
        const { roomID, role } = socket.handshake.query;
        socketHandler.connController(socket, roomID, role);
    });

    const start = () => {
        app.listen(port, ip, () => {
            console.log(`started at ${time.now()} | running on:${ip}:${port}`);
        });
    };

    return { start };
};

export default newServer;