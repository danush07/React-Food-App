
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/orders/';


const createOrder = async (orderData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, orderData, config);
    console.log(response.data)
    return response.data;
  
  } catch (error) {
    console.error('Axios request error:', error);
    if (error.response) {

      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
    
      console.error('No response received:', error.request);
    } else {

      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
};

const getOrders = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error('Axios request error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
};


// const clearOrders = async (token) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
  
//       await axios.delete(API_URL, config);
//     } catch (error) {
//       console.error('Axios request error:', error);
//       if (error.response) {
//         console.error('Response data:', error.response.data);
//         console.error('Response status:', error.response.status);
//         console.error('Response headers:', error.response.headers);
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//       } else {
//         console.error('Error setting up the request:', error.message);
//       }
//       throw error;
//     }
//   };


  //single order delte
  const deleteOrder = async (orderId, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      await axios.delete(`${API_URL}${orderId}`, config);
    } catch (error) {
      console.error('Axios request error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      throw error;
    }
  };

const orderService = {
  createOrder,
  getOrders,
  deleteOrder
};

export default orderService