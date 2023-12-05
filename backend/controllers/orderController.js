const asyncHandler = require('express-async-handler');
const Food = require('../Models/foodModel');
const User = require('../Models/userModel')

// Create new order

const createOrder = asyncHandler(async (req, res) => {
  const { date, location, mealTypes } = req.body;

  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User Not Found')
  }
  const order = await Food.create({
    date,
    location,
    mealTypes,
    user:req.user.id
  })
  res.status(201).json(order)
});



//get all orders

const getOrders = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User Not Found');
  }
  const {date} = req.body
  const existingOrder = await Food.findOne({ user: req.user.id, date });

  if (existingOrder) {
    res.status(400);
    throw new Error('An order already exists for the selected date');
  }
  const orders = await Food.find({ user: req.user.id });

  res.status(200).json(orders);
});

//delete all orders

// const clearOrders = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     res.status(401);
//     throw new Error('User Not Found');
//   }

//   await Food.deleteMany({ user: req.user.id });

//   res.status(200).json({ message: 'All orders cleared successfully.' });
// });


//dlt order
const deleteOrder = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User Not Found');
  }

  const orderId = req.params.id; 

  const order = await Food.findOne({ _id: orderId, user: req.user.id });

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  await Food.deleteOne({ _id: orderId, user: req.user.id });

  res.status(200).json({ message: 'Order deleted successfully.' });
});



module.exports = {
  createOrder,
  getOrders,
  // clearOrders,
  deleteOrder
};
