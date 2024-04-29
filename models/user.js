import mongoose from 'mongoose';


const usersSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
}, {timestamps: true})

export const User = mongoose.model('User', usersSchema)