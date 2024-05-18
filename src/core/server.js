import deviceAdapter from "../internal/modules/socket/adapters/deviceAdapter.js";
import authMiddleware from "../packages/middleware/auth.js";
import rolesMiddleware from "../packages/middleware/roles.js";
import lobbyMiddleware from "../packages/middleware/lobby.js";
import startSocket from "./socket.js";
import startHttp from "./http.js";
import {createServer} from "node:http";
import express from "express";
import {getLoggerInstance} from "../packages/logger/logger.js";
import welcomeAdapter from "../internal/modules/socket/adapters/welcomeAdapter.js";
import cors from "cors";


const startServer = async ({ config }) => {
    const logger = getLoggerInstance();

    const authorizedRoles = ['device'];
    const { host, port } = config;

    const app = express();
    const server = createServer(app);

    await startSocket({
        server: server,
        adapters: [
            deviceAdapter,
        ],
        middlewares: [
            authMiddleware,
            rolesMiddleware,
            lobbyMiddleware,
        ],
        options: {
            path: `${config.path}/gps-socket`,
            authorizedRoles: authorizedRoles
        },
    });

    await startHttp({
        app: app,
        adapters: [
            {
                method: 'get',
                path: '/welcome',
                adapter: welcomeAdapter,
            },
        ],
        middlewares: [
            cors
        ],
        options: {
            path: `${config.path}/gps-http`,
        },
    });

    server.listen(port, host, () => {
        logger.info(`Server running at ${host}:${port}`);
    });
};

export default startServer;