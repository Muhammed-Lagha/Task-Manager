const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: true,
        trim: true
    },
    email: {
        type: String ,
        unique: true ,
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
    }},
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks' ,{
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'author'
})

// Hiding tokens and password 
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// Generate a New Token
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id.toString() }, 'mySecret')
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

// login function
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the Password before saving 
userSchema.pre('save' , async function (next) {
    
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password ,8)
    }
    next()
})
const User = mongoose.model('User' ,userSchema )

module.exports = User 