const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB connection URL
const dbName = 'myDatabase'; // Name of the database

let db; // Variable to store the database connection

async function connect() {
    try {
        // Use MongoClient to connect to the MongoDB server
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect(); // Connect to the MongoDB server
        console.log('Connected to MongoDB server');

        // Select the database
        db = client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
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
            console.log('Disconnected from MongoDB server');
            db = null; // Reset the db variable
        }
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
}

module.exports = {
    connect,
    getDb,
    close
};
