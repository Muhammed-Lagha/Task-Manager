const express = require('express')
const router = new express.Router
const User = require('../models/user')

router.post('/users', async (req, res) => {
   
    const user = new User(req.body)

  try {
    const newUser = await user.save()
    res.status(201).send(newUser)
  } catch (error) {
    res.status(404).send(error)
  }  
})
// find users 
router.get('/users', async (req, res) => {
  
  try {
    const users = await User.find()
    res.status(200).send(users)
  } catch (error) {
    res.status(404).send(error)
  }
})
// find user by id
router.get('/users/:userId', async (req, res) => {
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

// update user 
router.patch('/users/:userId', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

  const _id = req.params.userId
  try {
    const user = await User.findByIdAndUpdate(_id)
    updates.forEach((update) => user[update] = req.body[update])
    await user.save()
    
    if (!user) return res.status(400).send()
    res.send(user)

  } catch (error) {
    res.status(400).send(error)
  }
})

// Delete User
router.delete('/users/:userId', async (req, res) => {
  const _id = req.params.userId
  try {
    const user = await User.findByIdAndDelete(_id)

  if(!user) return res.status(404).send()

  res.send(user)

  } catch (err) {
    req.status(500).send(err)
  }
})

module.exports = router
