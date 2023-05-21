const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
 { useNewUrlParser: true })

 const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({
    name: 'Muhammed',
    age: 26
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})


// const connectDB = async () => {
//     const conn = await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
//         {
//             useNewUrlParser: true,
//             useCreateIndex: true
//         })
        
//     console.log(`MongoDB Connected: ${conn.connection.host}`);

//     const User = await mongoose.model('User', {
//         name: { type: String },
//         age : { type: Number }
//     })
//     const me = new User({
//         name: "Muhammed",
//         age : 26
//     })

//     console.log(me)

//     return 'Done . '
// };

// connectDB().then(console.log).catch(console.error)

// module.exports = connectDB;
