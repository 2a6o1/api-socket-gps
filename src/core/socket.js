import { Server } from "socket.io";
import { getLoggerInstance } from "../packages/logger/logger.js";
import { MessageUpdater } from "../packages/tools/lastMessage.js";

const startSocket = async ({
    server,
    adapters= [],
    middlewares= [],
    options= {}
}) => {
    const logger = getLoggerInstance();

    if (!server) throw Error('Server is required');

    const io = new Server(server, options); // Pass options to the Server constructor

    middlewares.forEach(middleware => {
        const paramNames = middleware.toString()
            .match(/\((.*?)\)/)[1]
            .split(',')
            .map(param => param.trim());

        if (paramNames.includes('{io') && paramNames.includes('authorizedRoles}'))
            middleware({io: io, extraOptions: options.authorizedRoles});

        if (paramNames.includes('socket') && paramNames.includes('next'))
            io.use(middleware);
    });

    io.on('connection', (socket) => {
        const { roomId, lapse } = socket.session;

        socket.join(roomId);

        const messageUpdater = new MessageUpdater(lapse);

        socket.on('message', (message) => {
            adapters.socket.forEach(async adapter => {
                const paramNames = adapter.toString()
                    .match(/\((.*?)\)/)[1]
                    .split(',')
                    .map(param => param.trim());

                const params = {};

                if (paramNames.includes('socket')) params.socket = socket;
                if (paramNames.includes('message')) params.message = message;
                if (paramNames.includes('messageUpdater')) params.messageUpdater = messageUpdater;

                await adapter(...params);
            });
        });

        socket.on('disconnect', () => {

        });
    });
};

export default startSocket;