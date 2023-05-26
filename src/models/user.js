const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String ,
        required: true,
        trim: true
    },
    email: {
        type: String ,
        required: true,
        trim: true ,
        lowercase : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid Email that you provide .')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            // if (value.length <= 6) {
            //     throw new Error ('The Password most be 7 character')
            // }
            if (value.toLowerCase().includes('password')) {
                throw new Error ('You can not provide the word Password !')
            }
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
        if (value < 0) {
            throw new Error('Age must be a positive number .')
        }
    }}
})

module.exports = User 