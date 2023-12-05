import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from '../hooks/useAuthState'
import ClipLoader from "react-spinners/ClipLoader";

function PrivateRoute() {
    const {loggedIn,checkStatus} = useAuthState()

    if(checkStatus){
        return (
        <ClipLoader
        color = "#000000"
        loading = {true}
        size={250}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    )
    }
  return loggedIn ? <Outlet/> : <Navigate to='/login' />
}

export default PrivateRoute