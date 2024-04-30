import mongoose from 'mongoose';


const usersSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
}, {timestamps: true})

export const User = mongoose.model('User', usersSchema)