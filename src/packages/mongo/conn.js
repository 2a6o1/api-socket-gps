import { MongoClient } from 'mongodb';

let db; // Variable to store the database connection

const createUrl = (host, port, user, password) => {
    const credentials = user && password ? `${user}:${password}` : '';
    return `mongodb://${credentials}@${host}:${port}/?directConnection=true&authMechanism=SCRAM-SHA-1&authSource=admin`;
}

const connect = async ({ config }) => {
    try {
        const { database, host, port, user, password } = config;
        const url = createUrl(host, port, user, password);
        const client = new MongoClient(url);

        db = client.db(database);
        if (!db) {
            new Error('Could not connect to the database');
        }
    } catch (error) {
        throw error; // Rethrow the error for handling in the calling code
    }
}

function getDb() {
    if (!db) {
        throw new Error('Database not initialized. Call connect() first.');
    }
    return db;
}

async function close() {
    try {
        if (db) {
            await db.client.close(); // Close the database connection
            db = null; // Reset the db variable
        }
    } catch (error) {
        throw error; // Rethrow the error for handling in the calling code
    }
}

export { connect, getDb, close };
