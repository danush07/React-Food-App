const express = require('express');
const router = express.Router();

const {
  createOrder, getOrders,deleteOrder
} = require('../controllers/orderController');

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getOrders).post(protect,createOrder)
// router.route('/').delete(protect,clearOrders);
router.delete('/:id', protect, deleteOrder);

module.exports = router;
