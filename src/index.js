const express = require('express')
require('./db/mongoose.js')

const userRouter = require('./router/user.js')
const taskRouter = require('./router/task.js')

const app = express()
const port = process.env.PORT || 3000

const multer  = require('multer')
const upload = multer({ dest: 'images' })

app.post('/upload', upload.single('uploaded_file'), function (req, res) {
    res.send() 
    //console.log(req.file, req.body)
 })


// shat down the server
// app.use((req ,res ,nex) => {
//     res.status(503).send('The Site is Under maintenance Now ,Try Back Soon')
// })

app.use(express.json())

app.use(userRouter)

app.use(taskRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// const Task = require('./models/task.js')
// const User = require('./models/user.js')

// const main = async () => {
//   // const task = await Task.findById('64836c16c1dcb0362799834e')
//   // await task.populate('author').execPopulate()
//   // console.log(task.other) 
//   const user = await User.findById('648362be5953522785742c2b')
//   //await User.populate('tasks').execPopulate()
//   console.log(user.tasks)
// }
// main()

// bcrypt js 
// const bcrypt = require('bcryptjs');
// const saltRounds = 8;

// // hash the password
// const password = 'pass23421';

// const hash = '$2a$08$L/tAbSBh.qlqsOfLeiv2e.mf4Ps.a07vbjsiE4Uy6lnNjdNVYbrla'
// // verify the password
// bcrypt.compare(password, hash, function(err, result) {
//   if (result) {
//     console.log('Password is correct');
//   } else {
//     console.log('Password is incorrect');
//   }
// });