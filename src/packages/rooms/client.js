class Client {
    constructor(role) {
        this.socket = null;
        this.role = role;
    }

    setSocket = (socket) => {
        this.socket = socket;
    }

    send = (message) => {
        if (this.socket) {
            this.socket.send(message);
        }
    }
}

module.exports = Client;
