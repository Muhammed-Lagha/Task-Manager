const mongoose = require('mongoose')
// const validator = require('validator')

const Tasks = mongoose.model('Tasks',{
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
    
    //<issue_comment>username_1: @username_0 I think you're missing the `new` keyword.
})

module.exports = Tasks