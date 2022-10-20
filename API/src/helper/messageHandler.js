
const messageHandler = function(message, error = true) {

    return {
        error: error,
        message: message
    }

}

module.exports = messageHandler;