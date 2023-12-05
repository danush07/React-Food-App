import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

function Register() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [empId, setEmpId] = useState('');
  const [empIdErr, setEmpIdErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);
  const [confirmType, setConfirmType] = useState("password");
  const [confirmIcon, setConfirmIcon] = useState(eyeOff);

    useEffect(() => {
      if (isError) {
        toast.error(message);
      }
      if (isSuccess || user) {
        navigate("/");
      }
      dispatch(reset());
    }, [isError, isSuccess, user, message, dispatch]);
  const validatePassword = (password) => {
    const errors = [];
    
    if (!password) {
      return "Password is Required...";
    }
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return errors;
  };


  const handleToggle = (field) => {
    if (field === 'password') {
      setType(type === 'password' ? 'text' : 'password');
      setIcon(type === 'password' ? eye : eyeOff);
    } else if (field === 'confirmPassword') {
      setConfirmType(confirmType === 'password' ? 'text' : 'password');
      setConfirmIcon(confirmType === 'password' ? eye : eyeOff);
    }
  };
  const validateInput = (field, value) => {
    if (field === 'name' && value.trim() === '') {
      setNameError('Name field cannot be empty');
    } else if (field === 'name') {
      const nameregex = /^[a-zA-Z#_ ]{5,20}$/;
      setNameError(!nameregex.test(value.trim()) ? 'Username must be 5 - 20 Characters and can contain #_ ' : '');
    } else if (field === 'email') {
      const emailRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+(\+[a-zA-Z0-9]+)?(\.[a-zA-Z0-9]+(\+[a-zA-Z0-9]+)?)*@(?=.*[a-zA-Z])[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
      setEmailError(emailRegex.test(value.trim()) ? '' : 'Please enter a valid email address');
    } else if (field === 'empid') {
      const empregex = /^STS-\d{3}$/;
      setEmpIdErr(!empregex.test(value.trim()) ? 'ID Must begin with STS- followed by 3 digit numbers' : '');
    } else if (field === 'password') {
      const errors = validatePassword(value);
      setPasswordError(errors);
    } else if (field === 'confirm password') {
      setConfirmPasswordError(value === password ? '' : 'Passwords do not match');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    validateInput('name', name);
    validateInput('email', email);
    validateInput('empid', empId);
    validateInput('password', password);
    validateInput('confirm password', confirmPassword);

    const hasErrors =
      nameError || emailError || empIdErr || (Array.isArray(passwordError) && passwordError.length > 0) || confirmPasswordError;

    if (!hasErrors) {
      const userData = {
        name,
        email,
        empId,
        password,
      };
      console.log('Form submitted successfully!');
      dispatch(register(userData));
    } else {
      console.log('Form has errors');
    }
  };
  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              onBlur={() => validateInput('name', name)}
              value={name}
              type="text"
              id="name"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
           <span className='text-red-500'>{nameError}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              E-mail <span className="text-red-600">*</span>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateInput('email', email)}
              type="email"
              id="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className='text-red-500'>{emailError}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="empid" className="block text-gray-700 font-bold mb-2">
              Employee ID <span className="text-red-600">*</span>
            </label>
            <input
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              onBlur={() => validateInput('empid', empId)}
              type="text"
              id="empid"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
             <span className='text-red-500'>{empIdErr}</span>
          </div>
          <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password <span className="text-red-600">*</span>
          </label>
          <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => validateInput('password', password)}
            type={type}
            id="password"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
          />
          <span className="absolute top-0 right-0 h-full flex items-center pr-2 cursor-pointer" onClick={() => handleToggle('password')}>
            <Icon icon={icon} size={15} />
          </span>
            </div>
              {Array.isArray(passwordError) ? (
                passwordError.map((error, index) => (
                  <span key={index} className='text-red-500 block'>
                    {error}
                  </span>
                ))
              ) : (
                <span className='text-red-500'>{passwordError}</span>
              )}
            </div>

          <div className="mb-4">
            <label htmlFor="cpassword" className="block text-gray-700 font-bold mb-2">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => validateInput('confirm password', confirmPassword)}
              type={confirmType}
              id="confirm password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span class="flex justify-end items-center" onClick={() => handleToggle('confirmPassword')}>
              <Icon class="absolute mb-10 mr-2" icon={confirmIcon} size={15} />
            </span>
            <span className='text-red-500'>{confirmPasswordError}</span>
          </div>

          <button
            type="submit"
            className="bg-blue-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
          <div className="text-center">
            Already a user?{'  '}
            <Link to={'/login'}>
              <span className="text-blue-400 underline font-bold">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
