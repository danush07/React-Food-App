const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')

//reg user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email,empId, password } = req.body

 
  if (!name || !email || !empId || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if user already exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const userExists1 = await User.findOne({empId})
  if(userExists1){
    res.status(400)
    throw new Error('User with Same Employee ID Already Exists')
  }


  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    empId,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name:user.name,
      empId: user.empId,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new error('Invalid user data')
  }
})

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { empId, email, password } = req.body;
  const existingUser = await User.findOne({ $and: [{ email }, { empId }] });
  // const existEmail = await User.findOne({email})
  if(!email){
    res.status(401);
    throw new Error('Please Enter the Email');
  }
  if(!password){
    res.status(401);
    throw new Error('Please enter the password');
  }
  if(!empId){
    res.status(401);
    throw new Error('Please enter the empId');
  }
  if (!existingUser) {
    res.status(401);
    throw new Error('Email and Employee Id Does not Match');
  }
  if (empId !== existingUser.empId) {
    res.status(401);
    throw new Error('Invalid employee ID');
  }

  if (await bcrypt.compare(password, existingUser.password)) {
    res.status(200).json({
      _id: existingUser._id,
      name:existingUser.name,
      empId: existingUser.empId,
      email: existingUser.email,
      token: generateToken(existingUser._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid password');
  }
});


//get current user
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    empId: req.user.empId,
  }
  res.status(200).json(user)
})





// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}