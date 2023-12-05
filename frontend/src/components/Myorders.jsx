import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getOrders } from '../features/menu/orderSlice';
import Header from './Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);

  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handleBackClick = () => {
    navigate('/order');
  };
  function getMonthName(date) {
    return date.toLocaleDateString('en-GB', { month: 'long' });
  }
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch, selectedMonth]);

  const handleDeleteOrder = (orderId, orderDate) => {
    const orderDateObject = new Date(orderDate);
    const today = new Date();
  
    if (orderDateObject > today) {
      const confirmDelete = window.confirm('Are you sure you want to cancel this order?');
      if (confirmDelete) {
        dispatch(deleteOrder(orderId));
      }
    } else {
      toast.error('You cannot cancel past orders.');
    }
  };
  

  const calculateTotalCost = (filteredOrders) => {
    let totalCost = 0;

    filteredOrders.forEach((order) => {
      const { mealTypes } = order;

      if (mealTypes) {
        if (mealTypes.breakfast) {
          totalCost += 20;
        }
        if (mealTypes.lunch) {
          totalCost += 30;
        }
        if (mealTypes.dinner) {
          totalCost += 25;
        }
      }
    });

    return totalCost;
  };

  const filterOrdersByMonth = () => {
    const monthStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    const monthEnd = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);

    return orders.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate >= monthStart && orderDate <= monthEnd;
    });
  };

  const filteredOrders = filterOrdersByMonth();
  const totalCostForMonth = calculateTotalCost(filteredOrders);

  return (
    <>
      <Header />
      <div className="mt-8 max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-medium mb-4">My Orders</h1>
        <div className="mb-4">
          <DatePicker
          className='border-2 p-4 '
            showIcon
            selected={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            />

        </div>
        
        {filteredOrders.length === 0 ? (
          <p className="text-2xl text-red-600 mb-12">No orders available for the selected month.</p>
        ) : (
          <div>
            {filteredOrders.map((order, index) => {
              const { _id, date, location, mealTypes } = order;
              return (
                <div key={index} className="mb-4 border p-4 rounded-md">
                  <p className="text-lg font-semibold">Order {index + 1}</p>
                  <p className="text-gray-600"> Date: {new Date(date).toLocaleDateString('en-GB')}</p>
                  <p className="text-gray-600">Location: {location}</p>

                  {mealTypes && (
                    <div className="flex">
                      {mealTypes.breakfast && <p className="mr-2">Breakfast - ₹20</p>}
                      {mealTypes.lunch && <p className="mr-2">Lunch - ₹30</p>}
                      {mealTypes.dinner && <p className="mr-2">Dinner - ₹25</p>}
                    </div>
                  )}

                      <button
                        onClick={() => handleDeleteOrder(_id, date)}
                        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          Cancel Order
                      </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="mb-4">
          <p className="text-lg font-semibold">Total Cost for {getMonthName(selectedMonth)}: ₹{totalCostForMonth}</p>
          <p className="text-lg font-semibold">Total Cost for All Orders: ₹{calculateTotalCost(orders)}</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBackClick}
            className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default MyOrders;

