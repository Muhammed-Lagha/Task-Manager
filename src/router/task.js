const express = require('express')
const router = new express.Router
const Tasks = require('../models/task.js')

// Create Task
router.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body)
    try {
      task.save()
      res.status(200).send(task)
    } catch (error) {
      res.status(400).send(err)
    }
  })

// find Task
router.get('/tasks', async (req, res) => {
    try {
      const tasks = await Tasks.find()
      res.status(200).send(tasks)
    } catch (error) {
      res.status(500).send(error)
    }
  })

// find Task by Id
router.get('/tasks/:taskId', async (req, res) => {
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
  
// update Task
router.patch('/tasks/:taskId', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description' ,'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  
    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })
    
    const _id = req.params.taskId
    try {
      // const updateTask = await Tasks.findByIdAndUpdate(_id ,req.body ,{new: true ,runValidators: true})
      const updateTask = await Tasks.findByIdAndUpdate(_id)
      updates.forEach((update) => updateTask[update] = req.body[update])
      await updateTask.save()
    if (!updateTask) return res.status(404).send()
    return res.send(updateTask)
    } catch (error) {
      res.status(400).send(error)
    }
  })
  
// delete Task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Tasks.findByIdAndDelete(req.params.id)
  
        if (!task) {
            res.status(404).send()
        }
  
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
  })

  module.exports = router
