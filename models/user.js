import mongoose from 'mongoose';
import { stringify } from 'uuid';

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

const User = mongoose.model('User', usersSchema)