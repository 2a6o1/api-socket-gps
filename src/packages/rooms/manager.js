import Room from './room';

class Manager {
    constructor() {
        this.rooms = {};
    }

    createRoom= (roomID) => {
        this.rooms[roomID] = new Room();
    }

    joinRoom = (roomID, client) => {
        if (!this.rooms[roomID]) {
            throw new Error(`Room with ID ${roomID} does not exist`);
        }
        this.rooms[roomID].addClient(client);
    }

    leaveRoom = (roomID, client) => {
        if (!this.rooms[roomID]) {
            throw new Error(`Room with ID ${roomID} does not exist`);
        }
        this.rooms[roomID].removeClient(client);
    }

    getRoom = (roomID) => {
        return this.rooms[roomID];
    }
}

module.exports = Manager;
