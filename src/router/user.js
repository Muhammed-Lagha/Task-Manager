const express = require('express')
const router = new express.Router
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
   
    const user = new User(req.body)

  try {
    const newUser = await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({newUser ,token})
  } catch (error) {
    res.status(404).json({ message: 'Server error' })
  }  
})

// login router
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({token ,user})
  } catch (error) {
    res.status(400).json({ error: 'Invalid login credentials' })
  }
})

// find user profile 
router.get('/users/me' ,auth ,async (req, res) => {
  
 res.send(req.user)

})

// logout router
router.post('/users/logout', auth ,async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    await req.user.save()

    res.send()
} catch (e) {
    res.status(500).json({ message: 'Server error' })
}
})

// logout All Users
router.post('/users/logoutAll', auth , async(req ,res) => {
  try {
    req.user.tokens = []
    await req.user.save()
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// update user 
router.patch('/users/me', auth ,async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
  
    res.send(req.user)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete User {for now}
router.delete('/users/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})


module.exports = router
