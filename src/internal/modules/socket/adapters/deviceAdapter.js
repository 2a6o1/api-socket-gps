import { verifyExistence, modifyAfterLapse } from "../interactors/deviceInteractor.js";

const deviceAdapter = async ({ socket, message, messageUpdater }) => {
    const deviceId = socket.content.sessionToken.deviceId;
    if (!deviceId) {
        throw Error('Device id not found');
    }

    await verifyExistence(deviceId);

    const { latitude, longitude, speed } = message;
    const dto = new DeviceDto(
        deviceId,
        latitude,
        longitude,
        speed
    );

    await modifyAfterLapse(dto, messageUpdater);
};

export default deviceAdapter;


