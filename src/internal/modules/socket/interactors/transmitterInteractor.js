import {
    getTransmitterById,
    updateTransmitter
} from 'src/internal/modules/socket/domain/transmitterDbRepository';
import {
    MessageUpdater,
    performActionWithLastMessage
} from "src/packages/tools/lastMessage";
import {
    TransmitterResponse
} from "./transmitterModels";


const LAPSE_SECONDS = 5;

async function verifyExistence(transmitterId) {
    try {
        const entity = await getTransmitterById(transmitterId);
        if (!entity) {
            throw new Error('Transmitter not found');
        }

        return new TransmitterResponse(entity);
    } catch (error) {
        console.error('Error verifying transmitter existence:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
}

async function modify(transmitterDto) {
    try {
        const entity = {
            ...transmitterDto,
            updatedAt: new Date()
            // Update the updatedAt field to the current date and time
        };

        const result = await updateTransmitter(entity);
        if (result === 0) {
            throw new Error('Failed to update transmitter data');
        }

        return result;
    } catch (error) {
        console.error('Error updating transmitter data:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
}

const callback = async (lastMessage) => {
    await modify(lastMessage);
    console.log('Updating transmitter with last message:', lastMessage);
};

async function modifyAfterLapse(transmitterDto) {
    try {
        const messageUpdater = new MessageUpdater();

        const entity = {
            ...transmitterDto,
            updatedAt: new Date()
        };

        performActionWithLastMessage(messageUpdater, entity, LAPSE_SECONDS, callback);
    } catch (error) {
        console.error('Error updating transmitter data:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
}

export {
    verifyExistence,
    modify,
    modifyAfterLapse,
};
