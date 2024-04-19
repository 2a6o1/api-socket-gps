class Room {
    constructor() {
        this.transmitter = null;
        this.observers = [];
    }

    setTransmitter = (transmitter) => {
        this.transmitter = transmitter;
    }

    addClient = (client) => {
        if (client.role === 'transmitter' && this.transmitter === null) {
            this.transmitter = client;
        } else if (client.role === 'observer') {
            this.observers.push(client);
        }
    }

    removeClient = (client) => {
        if (client.role === 'transmitter') {
            this.transmitter = null;
        } else if (client.role === 'observer') {
            this.observers = this.observers.filter(obs => obs !== client);
        }
    }

    broadcast = (message) => {
        this.observers.forEach(observer => {
            observer.send(message);
        });
    }
}

module.exports = Room;
