import mongoose from 'mongoose'

const listSchema = new mongoose.Schema({
    adminID: { type: 'string', required: true },
    additionalAdmins: [{ type: { adminID: { type: 'string', required: true } }, default: [] }],
    listName: { type: 'string', required: true },
    listItems: [{
        type: {
            itemName: { type: 'string', required: true },
            completed: { type: 'boolean', default: false },
            inProgress: { type: 'boolean', default: false },
            timeToBeCompleted: { type: 'date' }
        },
        required: true,
        default: []
    }],

    invites: [{
        type: {
            email: { type: 'string', required: true },
            inviteDate: { type: 'string', default: Date.now() }
        },
        default: []
    }],
    createdDate: { type: 'string', default: Date.now() }

})

export const List = mongoose.model('lists', listSchema)