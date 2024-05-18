import {
    getDeviceById,
    updateDevice
} from '../domain/deviceDbRepository.js';
import {
    performActionWithLastMessage
} from "../../../../packages/tools/lastMessage.js";
import {
    DeviceResponse
} from "./deviceModels.js";


const verifyExistence = async (deviceId) => {
    const entity = await getDeviceById(deviceId);
    if (!entity) {
        throw Error('Transmitter not found');
    }

    return new DeviceResponse(entity);
}

const modify = async (dto) =>{
    const entity = {
        ...dto,
        updatedAt: new Date()
        // Update the updatedAt field to the current date and time
    };

    const result = await updateDevice(entity);
    if (result === 0) {
        throw Error('Failed to update device data');
    }

    return result;
}

const callback = async (lastMessage) => {
    await modify(lastMessage);
};

const modifyAfterLapse = async (dto, msgUpdater) => {
    const entity = {
        ...dto,
        updatedAt: new Date()
    };

    await performActionWithLastMessage(msgUpdater, entity, callback);
}

export {
    verifyExistence,
    modify,
    modifyAfterLapse,
};
