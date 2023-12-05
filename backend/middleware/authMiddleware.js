const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
    
      token = req.headers.authorization.split(' ')[1]
    
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log('Decoded Token:', decoded);
      req.user = await User.findById(decoded.id).select('-password')
      
      if (!req.user) {
        res.status(401)
        throw new Error('No User Found')
      }

      next()
    } catch (error) {
      console.log(error)
      console.log('Error in authentication middleware:', error.message);
      res.status(401).json({ message: 'Not authorized', error: error.message });

    }
  }

  if (!token) {
    res.status(401)
    throw new Error('NO token found')
  }
})

module.exports = { protect }