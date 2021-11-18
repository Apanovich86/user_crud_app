const {userRoles} = require('../configs');
const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    user_type: {
        type: String,
        enum: Object.values(userRoles),
        required: true,
        trim: true
    }
}, {timestamps: true});

module.exports = model('user', userSchema);
