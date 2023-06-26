const express = require('express')
const multer = require('multer')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router



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
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.deleteOne()
    res.json({ message: 'User deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})

const avatar = multer({ 
  dest: 'avatar' ,
  limits: {
    fieldSize: 1000000
  },
  fileFilter (req ,file ,cb) {
    if(!file.originalname.match(/\.(jpg|png|jfif)/)) return cb(new Error('file must be image !'))
    
     cb(undefined ,true)
    // cb(undefined ,false)
  }
})
// Setup endpoint for avatar upload
router.post('/users/me/avatar', auth, avatar.single('avatar') ,async (req, res) => {
  res.json({ message: 'Avatar Uploaded'})
})


module.exports = router
