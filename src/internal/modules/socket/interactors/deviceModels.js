class DeviceRequest {
    constructor({ id, latitude, longitude, speed }) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
    }
}

class DeviceResponse {
    constructor({
        id,
        latitude,
        longitude,
        companyId,
        vehicularUnit,
        speed,
        createdAt,
        updatedAt
    }) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.companyId = companyId;
        this.vehicularUnit = vehicularUnit;
        this.speed = speed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export { DeviceResponse, DeviceRequest };