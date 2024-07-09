export class errorhandle extends Error {
    constructor(message, statuscode) {
        super(message)
        this.statuscode = statuscode || 401
    }
}