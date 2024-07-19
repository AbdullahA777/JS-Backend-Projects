// Api Error

class ApiError {
    constructor(statusCode, message = "An error occurred", error = null) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.success = false;
    }

    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            error: this.error
        });
    }
}

export { ApiError };
