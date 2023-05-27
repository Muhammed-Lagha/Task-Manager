const express = require('express')
require('./db/mongoose.js')
const User = require('./models/user.js')
const Tasks = require('./models/task.js')

const app = express()
const port = process.env.PORT || 3000

// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.json())

app.post('/users', (req, res) => {
   
    const user = new User(req.body)
    user.save().then(() => {
       return res.send(user)
    }).catch((err) => {
       return res.status(400).send(err)
    })
})

app.get('/users', (req, res) => {
    User.find().then((users) => {
        return res.send(users)
    }).catch(() =>{
        return res.status(500).send('Error')
    })
})

app.get('/users/:userId', (req, res) => {
  const _id = req.params.userId
  
  User.findById(_id).then((user) => {
    if (!user) {
        res.status(404).send()
    }
    return res.send(user)
  }).catch(() => {
    return res.status(500).send('Error')
  })
})

app.post('/tasks', (req, res) => {
  
    const task = new Tasks(req.body)
    task.save().then(() => {
        return res.send(task)
    }).catch((err) => {
        return res.status(400).send(err)
    })
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))