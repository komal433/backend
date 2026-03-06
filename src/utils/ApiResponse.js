class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;    // HTTP status code (200, 201, 400, etc.)
        this.data = data;                 // The actual response data/payload
        this.message = message;            // Response message (defaults to "Success")
        this.success = statusCode < 400;   // Boolean: true for success (status < 400)
    }
}
