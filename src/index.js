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

app.post('/tasks', (req, res) => {
  
    const task = new Tasks(req.body)
    task.save().then(() => {
        return res.send(task)
    }).catch((err) => {
        return res.status(400).send(err)
    })
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))