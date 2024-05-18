class MessageUpdater {
    constructor(lapse) {
        this.lastMessage = null;
        this.updateTimeout = null;
        this.lapse = lapse || 5;
    }
}

const performActionWithLastMessage = async (msgUpdate, msg, func) => {
    msgUpdate.lastMessage = msg;

    if (msgUpdate.updateTimeout) {
        clearTimeout(msgUpdate.updateTimeout);
    }

    msgUpdate.updateTimeout = setTimeout(async () => {
        try {
            // Call the provided callback function with the last message
            await func(msgUpdate.lastMessage);
        } catch (error) {
            throw Error(`Error performing action with last message ${error}`);
        } finally {
            msgUpdate.lastMessage = null;
            msgUpdate.updateTimeout = null;
        }
    }, msgUpdate.lapse * 1000);
}


export { MessageUpdater, performActionWithLastMessage};