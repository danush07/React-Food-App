import React, { useState, useEffect } from 'react';
import Header from './Header';
import { createOrder } from '../features/menu/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setSelectedDate] = useState('');
  const [location, setSelectedLocation] = useState('Chennai');
  const [mealType, setSelectedMealTypes] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const { orders, isError, message } = useSelector(state => state.order);
  console.log('Orders from Redux store:', orders);


  const handleCheckboxChange = (mealType) => {
    setSelectedMealTypes((prev) => ({
      ...prev,
      [mealType]: !prev[mealType],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected Date:', date);
    console.log('Existing Orders:', orders);
  
    if (!date) {
      toast.error('Please Select The Date');
      return;
    }
  
    if (!location) {
      toast.error('Please Select the Location');
      return;
    }
  
    const anyOne =
      mealType.breakfast || mealType.lunch || mealType.dinner;
  
    if (!anyOne) {
      toast.error('Please select atleast one meal type');
      return;
    }
  
    const existingOrder = orders.find((order) => {
      const orderDate = new Date(order.date);
  
      const selectedDate = new Date(date);
      orderDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
  
      return (
        orderDate.getTime() === selectedDate.getTime() 
        // && order.location === location
      );
    });
  
    if (existingOrder) {
      toast.error('You have Placed the Order for This Day');
      return;
    }
  
    const orderData = {
      date,
      location,
      mealTypes: {
        breakfast: location === 'Chennai' || location === 'Coimbatore' ? mealType.breakfast : false,
        lunch: mealType.lunch,
        dinner: location === 'Chennai' || location === 'Coimbatore' ? mealType.dinner : false,
      },
    };
  
    try {
      dispatch(createOrder(orderData));
      setSelectedDate('');
      setSelectedLocation('Chennai');
      setSelectedMealTypes({
        breakfast: false,
        lunch: false,
        dinner: false,
      });
      navigate('/my-order');
    } catch (error) {
      toast.error('Error creating order');
      console.log(error)
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  
   
  }, [isError, orders, message, date]);
  
  
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);


  return (
    <>
    <Header />
    <div className="mt-24 max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-medium mb-4">Order Form</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date:
            <DatePicker
            selected={date}
              value={date}
              onChange={(date) => setSelectedDate(date)}
              minDate={nextDay}
              className=" ml-2 border  py-2 px-2 text-gray-700 text-start"
              dateFormat='dd MMMM yyyy'
              placeholderText="select  a date"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="day">
            Location:
            <select
              value={location}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Erode">Erode</option>
            </select>
          </label>
        </div>

        {location === 'Chennai' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Breakfast
              <input
                type="checkbox"
                checked={mealType.breakfast}
                onChange={() => handleCheckboxChange('breakfast')}
                className="ml-2"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lunch
              <input
                type="checkbox"
                checked={mealType.lunch}
                onChange={() => handleCheckboxChange('lunch')}
                className="ml-2"
              />
            </label>
          </div>
        )}

        {location === 'Coimbatore' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Breakfast
              <input
                type="checkbox"
                checked={mealType.breakfast}
                onChange={() => handleCheckboxChange('breakfast')}
                className="ml-2"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lunch
              <input
                type="checkbox"
                checked={mealType.lunch}
                onChange={() => handleCheckboxChange('lunch')}
                className="ml-2"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Dinner
              <input
                type="checkbox"
                checked={mealType.dinner}
                onChange={() => handleCheckboxChange('dinner')}
                className="ml-2"
              />
            </label>
          </div>
        )}

        {location === 'Erode' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lunch
              <input
                type="checkbox"
                checked={mealType.lunch}
                onChange={() => handleCheckboxChange('lunch')}
                className="ml-2"
              />
            </label>
          </div>
        )}
      <div className="flex justify-between">
        <button
          type="submit"
          disabled={isError} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Place Order
        </button>
        <Link to='/my-order'>
        <button
          className="bg-orange-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View My Orders
        </button>
        </Link>
        </div>
      </form>
      
    </div>
    <div className="flex mt-8 justify-center">
          <button
            onClick={()=>navigate('/')}
            className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Home Page
          </button>
        </div>
    
    </>
  );
};

export default OrderForm;
