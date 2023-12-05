// import React, {  } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Home() {
  const {user} = useSelector((state) => state.auth)

  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center ">
        {user && (
          <h1 className="text-5xl font-medium mb-4 pb-6">
            Welcome, {user.name} ! Order Your Food Here 
          </h1>
        )}
       <div className="flex justify-center items-center">
         <Link to="/order">
           <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-24 px-5 py-2.5 text-center mr-2">
             Place Order
           </button>
         </Link>
         <Link to="/my-order">
           <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-24 py-2.5 text-center">
            View Your Orders!
           </button>
         </Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home