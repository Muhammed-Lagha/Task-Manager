const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
 { useNewUrlParser: true })

const Tasks = mongoose.model('Tasks',{
    description: {
        type : String,
        required : true,
        trim : true
    },
    completed: {
        type : Boolean,
        default : false
    } 
})

const task = new Tasks({
    description : '   Learn Vue.js',
   
})
task.save().then(console.log(task)).catch(err => console.error(err))

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
            if (value.tolowercase().includes('password')) {
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

const me = new User({
    name: 'Muhammed Lagha',
    email: '   muhaMMed.lagha@gmail.com',
    password: 'pass123'

})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})
