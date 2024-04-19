class MessageUpdater {
    constructor() {
        this.lastMessage = null;
        this.updateTimeout = null;
    }
}

const performActionWithLastMessage = (lastMsg, msg, lapse, func) => {
    lastMsg.lastMessage = msg;

    if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
    }

    this.updateTimeout = setTimeout(async () => {
        try {
            // Call the provided callback function with the last message
            await func(lastMsg.lastMessage);
        } catch (error) {
            console.error('Error performing action with last message:', error);
        } finally {
            lastMsg.lastMessage = null;
            lastMsg.updateTimeout = null;
        }
    }, lapse * 1000);

    return 'Action received';
}


export { MessageUpdater, performActionWithLastMessage};