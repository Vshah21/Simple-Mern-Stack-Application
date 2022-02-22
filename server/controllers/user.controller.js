const User = require('../models/user.models')
const extend = require('lodash/extend')
const errorHandler = require('./error.controller.js')

const create = async (req, res) => {
    // new user
    console.log(req.body)
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } 
    catch (err) {
        return res.status(400).json({
            
            error: errorHandler.getErrorMessage(err)
        })
    }
}
   
const list = async(req, res) => {
        try{
            let users = await User.find().select('name email updated created')
            res.json(users)
        }catch(err){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
  }
const userByID =async (req, res, next, id) => {
    try {
        let user = await User.findById(id)

        if(!user){
            return read.status('400').json({
                error:"User not found"
            })
        }
        req.profile = user
        next()
        
    } catch (error) {
        return res.status('400').json({
            error:"could not retrieve user"
        })
    }
    
 }

const read = async(req, res) => { 
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
 }
const update = async(req, res, next) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
    })
    }
}
const remove =async (req, res, next) => { 
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
    })
}
}

module.exports = { create, userByID, read, list, remove, update }