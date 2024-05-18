import { getDb } from '../../../../packages/mongo/conn.js'; // Import getDb from your database module
import Device from './deviceEntity.js'; // Import TransmitterEntity if not already imported

const COLLECTION_NAME = 'devices'; // Define collection name as a constant

let db; // Reuse database connection
const assignDb = (database) => {
    db = database;
};

const updateDevice = async (device) => {
    try {
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: device.id },
            {
                $set: {
                    latitude: device.latitude,
                    longitude: device.longitude,
                    speed: device.speed,
                    updatedAt: device.updatedAt
                },
            }
        );
        return result.modifiedCount; // Return the number of modified documents
    } catch (error) {
        throw error; // Rethrow the error for handling in the calling code
    }
};

const getDeviceById = async (deviceId) => {
    try {
        const deviceData = await db.collection(COLLECTION_NAME).findOne({ _id: deviceId });
        if (!deviceData) {
            return null;
        }
        return new Device(deviceData);
    } catch (error) {
        throw error; // Rethrow the error for handling in the calling code
    }
};

export { updateDevice, getDeviceById, assignDb };
