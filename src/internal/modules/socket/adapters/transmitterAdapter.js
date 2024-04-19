import {
    modify,
    modifyAfterLapse,
    verifyExistence,
} from 'src/internal/modules/socket/interactors/transmitterInteractor';

const modifyAdapter = (transmitterId) => {
    try {
        const transmitter = modify(transmitterId);

        if (!transmitter) {
            throw new Error('Transmitter not found');
        }

        return true;
    } catch (error) {
        console.error('Error verifying transmitter existence:', error);
        throw error;
    }
}