const express = require('express')
require('./db/mongoose.js')
const User = require('./models/user.js')
const Tasks = require('./models/task.js')

const app = express()
const port = process.env.PORT || 3000

// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.json())

app.post('/users', async (req, res) => {
   
    const user = new User(req.body)

  try {
    const newUser = await user.save()
    res.status(201).send(newUser)
  } catch (error) {
    res.status(404).send(error)
  }  
})

app.get('/users', async (req, res) => {
  
  try {
    const users = await User.find()
    res.status(200).send(users)
  } catch (error) {
    res.status(404).send(error)
  }
})

app.get('/users/:userId', async (req, res) => {
try {
  const _id = req.params.userId
  const user = await User.findById(_id)
  
  if (!user) {
    return res.status(404).send('User not found')
  }
  res.send(user)

} catch (error) {
  res.status(500).send('Error')
}  
})

app.post('/tasks', async (req, res) => {
  const task = new Tasks(req.body)
  try {
    task.save()
    res.status(200).send(task)
  } catch (error) {
    res.status(400).send(err)
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Tasks.find()
    res.status(200).send(tasks)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/tasks/:taskId', async (req, res) => {
  const _id = req.params.taskId
  try {
    const taskId = await Tasks.findById(_id)
      if (!taskId) {
          res.status(404).send()
      }
      return res.send(taskId)
  } catch (error) {
    res.status(500).send('Error')
  }
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))