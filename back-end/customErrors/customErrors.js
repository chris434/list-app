export class FieldError extends Error {
    constructor(field, message) {
        super(field, message)
        this.field = field
        this.message = message

    }
}