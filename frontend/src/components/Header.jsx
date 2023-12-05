import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-slate-50 mb-3"'>
      <div className='text-black-600 font-bold'> 
        <Link to='/'>Span Foods</Link>
      </div>
      <ul className='flex flex-col lg:flex-row list-none lg:ml-auto items-center'>

        {user ? (
          <li>
            <button className=' relative flex flex-wrap items-center gap-2 border  bg-gray-200 text-gray-700 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline'
             onClick={onLogout}>
              <FaSignOutAlt className='inline-flex items-baseline'/>Logout
            </button>

          </li>
        ) : (
          <>
            <li>
              <button className='  bg-slate-50 text-gray-700 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline'>

            <Link to='/login' className='text-center'>
               <FaSignInAlt className='inline-flex items-baseline' /> Login
            </Link>
              </button>

            </li>
            <li>
              <button className=' bg-slate-50 text-gray-700 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline'>

              <Link to='/register'>
                <FaUser  className='inline-flex items-baseline' /> Register
              </Link>
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header