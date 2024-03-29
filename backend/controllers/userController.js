const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Authenticate a user
// @route POST /api/users/
// @access Public 


const registerUser = asyncHandler(async (req,res)=>{
    const {name , email , password} = req.body

    if(!name || !email || !password){
         res.status(400)
         throw new Error("Please add all fields")
    }

    // Chack if the user exists
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error ('user already exists')
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    // Create User 
    const user = await  User.create ({
        name,
        email,
        password : hashedPassword,
        
    })
    if (user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id),
            
        })
    }else{
        res.status(400)
        throw new Error("Invalid User data")
    }
}) 


// @desc login a user
// @route POST /api/users/login
// @access Public 
const loginUser =asyncHandler( async(req,res)=>{

    const {email,password} = req.body
    // check for user email
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))){

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token:generateToken(user.id),
        })
    }  else {
        
       res.status(400).json({
        message:"user not found"
       })
    }
    
})

// Generate JWT 
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET , {
            expiresIn :'30d'
        

    })
}
// @desc Get a user
// @route GET /api/users/
// @access Private 
const getMe = asyncHandler(async(req,res)=>{

    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name,
        email
    })
    
})

module.exports = {registerUser,loginUser, getMe};