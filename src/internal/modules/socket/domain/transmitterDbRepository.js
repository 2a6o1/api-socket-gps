import { getDb } from 'src/packages/mongo/conn'; // Import the getDb from your existing db module
import TransmitterEntity from 'src/internal/modules/socket/domain/transmitterEntity';

const COLLECTION_NAME = 'transmitter'; // Name of the collection in the database

const updateTransmitter = async(transmitter) => {
    try {
        const db = getDb(); // Get the database instance
        const result = await db.collection(COLLECTION_NAME).updateOne({
            _id: transmitter.id
        }, {
            $set: {
                latitude: transmitter.latitude,
                longitude: transmitter.longitude,
                speed: transmitter.speed,
                updatedAt: transmitter.updatedAt
            },
        }, {
            upsert: false
        });

        return result.modifiedCount; // Return the number of modified documents
    } catch (error) {
        console.error('Error updating transmitter:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
}

const getTransmitterById = async(transmitterId) => {
    try {
        const db = getDb(); // Get the database instance
        const transmitterData = await db.collection(COLLECTION_NAME).findOne({ _id: transmitterId });
        if (!transmitterData) {
            return null;
        }

        return new TransmitterEntity(transmitterData);
    } catch (error) {
        console.error('Error getting transmitter by ID:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
}

export {
    updateTransmitter,
    getTransmitterById
};