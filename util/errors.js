class HttpError extends Error {
    constructor(message) {
        super(message);
        this.name = "HttpError";
    }
}

class InvalidInputError extends HttpError {
    constructor(message, inputName) {
        super(message, inputName);
        this.inputName = inputName;
        this.statusCode = 422;
    }
}

exports.InvalidInputError = InvalidInputError;
