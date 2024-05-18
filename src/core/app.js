import { connect, getDb, close } from "../packages/mongo/conn.js";
import { assignDb as assignDeviceDb } from "../internal/modules/socket/domain/deviceDbRepository.js";
import {getLoggerInstance, newLogger} from "../packages/logger/logger.js";
import {getConfig, loadConfig} from "./config/configLoader.js";
import startServer from "./server.js";
import * as stackTrace from "stack-trace";
import path from "path";
import errorWithDetails from "../packages/tools/errorStack.js";


const startApp = async () => {
    loadConfig();
    const config = getConfig();

    newLogger({ config: config.logger });
    const logger = getLoggerInstance();

    try {
        logger.info('Starting the app...');

        await connect({ config: config.db });
        const db = getDb();
        assignDeviceDb(db);

        await startServer({ config: config.server });
    } catch (error) {
        const errorDetails = errorWithDetails(error);
        logger.error(errorDetails);
        logger.error(`Error during app execution: ${error.message}`);
        process.exit(1);
    }
};

process.on('SIGTERM', async () => {
    const logger = getLoggerInstance();
    logger.info('Closing opened services');
    await close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    const logger = getLoggerInstance();
    logger.info('Closing opened services');
    await close();
    process.exit(0);
});


export { startApp };