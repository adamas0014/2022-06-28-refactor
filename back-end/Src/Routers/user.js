const User = require('../Models/user')

const {auth} = require('../Middleware/auth')
require('../../Database/mongoose')
const express = require('express')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const SendEmail = require('../email/SendGrid')
const userRouter = new express.Router()



userRouter.post('/users/create', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        SendEmail(req.body.email, 'Welcome to SEPT-IoT-Connect!', "Thanks for signing up! \n -Adam")
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


userRouter.post('/users/login', async (req, res, next) => {
    
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        //console.log("returning from findByCred" + JSON.stringify(user))
        const token = await user.generateAuthToken()
        //console.log("auth token = " + token)
        console.log("user = " + JSON.stringify(user))
       
        res.status(200).send({ user: user.getPublicProfile(), token })
    } catch (e) {
        res.status(400).send('Incorrect credentials')
    }
})


userRouter.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
userRouter.post('/users/support', auth, async (req, res) => {
    try{
        console.log(req.body)
        SendEmail('sokacza@mcmaster.ca', req.body.topic, req.body.email + "\n\nEnquiry:\n" + req.body.body)
        SendEmail(req.body.email, req.body.topic, " Email sent!\n\nEnquiry:\n" + req.body.body)
        res.send()
    }
    catch(e){
        res.status(500).send('Unable to send email', e)
    }
})


userRouter.post('/users/modify', auth, async (req, res) => {
    //console.log(req.body)
    let oldUser = req.user
    let newUser = req.body
    const cmp = bcrypt.compareSync(newUser.password, oldUser.password)
    console.log("cpm = " + cmp)
    if(cmp){
        delete newUser.password 
        delete newUser.email
    }
    else{
        console.log('false')
    }
    const updates = Object.keys(newUser)
    console.log(JSON.stringify(updates))
    const allowedUpdates = ['firstName', 'lastName', 'company']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        await oldUser.updateOne({firstName: newUser.firstName, lastName: newUser.lastName, company: newUser.company})
        console.log("saved to db")
        SendEmail(req.user.email, 'SEPT-IoT-Connect Account', "Your account info was modified successfully! \n -Adam")
        res.send(req.user)

    } catch(e){
        console.log("Error: " + JSON.stringify(e))
        res.status(400).send(e)
    }
        
})

userRouter.get('/users/me', auth, async (req, res) => {
    res.send(req.user.getPublicProfile())
})


userRouter.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    console.log('req.body', req.body)
    const allowedUpdates = ['firstName', 'lastName', 'email', 'company', 'profilePicture', 'widgets']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log('isValidOperation', isValidOperation)
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

userRouter.patch('/users/password', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    
    const allowedUpdates = ['password']
    req.body.password = bcrypt.hashSync(req.body.password, 7)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log('isValidOperation', isValidOperation)
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

const upload = multer({
    limits: {
        fileSize: 100000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})


userRouter.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})






module.exports = userRouter