class Device {
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

export default Device;