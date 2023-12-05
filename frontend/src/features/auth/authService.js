import axios from 'axios'

let URL = "http://localhost:5000/api/users/"
//regsiter user
const register = async (userData) =>{
    const response  = await axios.post(URL,userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}
//login user
const login = async (userData) =>{
    const response  = await axios.post(URL+'login',userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}
 
//logout user

const logout = () =>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}


export default authService