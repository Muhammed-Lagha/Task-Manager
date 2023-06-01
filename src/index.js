const express = require('express')
require('./db/mongoose.js')

const userRouter = require('./router/user.js')
const taskRouter = require('./router/task.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)

app.use(taskRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const bcrypt = require('bcryptjs')

const myFunction = async () => {
  const password = 'blue123456@'
  const hashedPassword = await bcrypt.hash(password ,8)
  console.log(password)
  console.log(hashedPassword)
} 
myFunction()