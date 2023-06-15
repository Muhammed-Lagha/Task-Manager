const mongoose = require('mongoose')
// const validator = require('validator')

const TasksSchema = mongoose.Schema({
    description: {
        type : String,
        required : true,
        trim : true
    },
    completed: {
        type : Boolean,
        default : false
    }, 
    author: {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'User'
    }
    
}, {
    timestamps: true
})

const Task = mongoose.model('Task' ,TasksSchema )

module.exports = Task