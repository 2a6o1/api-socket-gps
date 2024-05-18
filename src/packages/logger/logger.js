import path from 'path';
import winston from 'winston';
import fs from 'fs';

let loggerInstance = null;

const newLogger = (config) => {
    const { fileName, level } = config;

    if (!loggerInstance) {
        loggerInstance = initializeLogger(fileName, level);
    }
    return loggerInstance;
};

const initializeLogger = (logFileName, level) => {
    const logDirectory = createLogDirectory();
    const fileTransports = createFileTransports(logDirectory, logFileName);
    const consoleTransport = createConsoleTransport(level);
    return winston.createLogger({
        level: level,
        transports: [consoleTransport, ...fileTransports]
    });
};

const getLoggerInstance = () => {
    if (!loggerInstance) {
        throw new Error('Logger has not been initialized. Call createLogger() first.');
    }
    return loggerInstance;
};

const createLogDirectory = () => {
    const logsDirectory = path.join('.', 'logs');
    if (!fs.existsSync(logsDirectory)) {
        fs.mkdirSync(logsDirectory);
    }
    return logsDirectory;
};

const createCustomFormat = () => {
    return winston.format.printf(({ level, message, timestamp }) => {
        if (!(timestamp instanceof Date)) {
            timestamp = new Date();
        }
        const logObject = {
            timestamp: timestamp.toISOString(),
            level: level,
            message: message
        };
        return JSON.stringify(logObject);
    });
};

const createFileTransports = (logDirectory, logFileName) => {
    const levels = ['error', 'warn', 'info', 'debug']; // Define log levels
    return levels.map(level => {
        const customFormat = createCustomFormat();
        return new winston.transports.File({
            filename: path.join(logDirectory, `${logFileName}.${level}.log`),
            level: level,
            format: winston.format.combine(
                winston.format.timestamp(),
                customFormat
            ),
            handleExceptions: true, // Add this line to handle exceptions
            handleRejections: true // Add this line to handle promise rejections
        });
    });
};

const createConsoleTransport = (level) => {
    const customFormat = createCustomFormat();
    return new winston.transports.Console({
        format: winston.format.combine(
            winston.format.simple(),
            customFormat
        ),
        level: level
    });
};

export { newLogger, getLoggerInstance };
