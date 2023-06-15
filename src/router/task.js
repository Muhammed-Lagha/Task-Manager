const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router
const Tasks = require('../models/task.js')

// Create Task
router.post('/tasks' ,auth ,async (req, res) => {
    //const task = new Tasks(req.body)
    const task = new Tasks({
      ...req.body,
      author : req.user._id
    })
    try {
      task.save()
      res.status(200).send(task)
    } catch (error) {
      res.status(400).send(err)
    }
  })

// Get All Tasks
router.get('/tasks', auth ,async (req, res) => {
  const completed = req.query.completed

  const filter = {}
  if (completed) {
    filter.completed = completed === 'true'
  }

    try {
      const tasks = await Tasks.find({filter ,author : req.user._id})
      res.status(200).send(tasks)
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  })

// find Task by Id
router.get('/tasks/:taskId', auth ,async (req, res) => {
    const _id = req.params.taskId
    try {
      const taskId = await Tasks.findOne({_id , author: req.user._id})
        if (!taskId) {
            res.status(404).json({ message: 'Error ,Task not found' })
        }
        return res.send(taskId)
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
    })
  
// update Task
router.patch('/tasks/:taskId', auth ,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description' ,'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  
    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })
    
    const _id = req.params.taskId
    try {
      // const updateTask = await Tasks.findByIdAndUpdate(_id ,req.body ,{new: true ,runValidators: true})
      const updateTask = await Tasks.findOne({_id , author:req.user._id})
      
      if (!updateTask) return res.status(404).send()

      updates.forEach((update) => updateTask[update] = req.body[update])
      
      await updateTask.save()
    
    return res.send(updateTask)
    } catch (error) {
      res.status(400).send(error)
    }
  })
  
// delete Task
router.delete('/tasks/:id', auth ,async (req, res) => {
    try {
        //const task = await Tasks.findByIdAndDelete(req.params.id)
        const task = await Tasks.findOneAndDelete({_id: req.params.id ,author: req.user._id})
  
        if (!task) return res.status(404).send()
  
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
  })

  module.exports = router
