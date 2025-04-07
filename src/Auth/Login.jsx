import React, { useState } from 'react';
import { LuArrowLeft } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOpenUserLogin } from '../redux/slices/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import toast from 'react-hot-toast';
import loginImg from '../assets/images/loginImg.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const isUserLoginOpen = useSelector((state) => state.user.isUserLoginOpen);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOpenLogin = () => {
    dispatch(toggleOpenUserLogin(false));
  };

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
    setFormData({ email: '', password: '', phone: '' });
    setAcceptTerms(false);
    setError('');
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignup && (!acceptTerms || !/^\d{10}$/.test(formData.phone))) {
      toast.error(
        'Please accept terms and enter a valid 10-digit phone number.'
      );
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    const toastId = toast.loading(isSignup ? 'Signing up...' : 'Logging in...');
    const url = isSignup
      ? 'https://driving.shellcode.cloud/api/users/signup'
      : 'https://driving.shellcode.cloud/api/users/login';

    try {
      // Prepare request payload
      const payload = {
        ...formData,
        phone_number: formData.phone,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Check response status
      if (!response.ok) {
        if (data.message === 'Email already exists') {
          toast.error(
            'This email is already registered. Try logging in instead.',
            { id: toastId }
          );
        } else {
          toast.error(data.message || 'Authentication failed', { id: toastId });
        }
        return;
      }

      toast.success(isSignup ? 'Signup successful!' : 'Login successful!', {
        id: toastId,
      });
      if (isSignup) {
        setIsSignup(false);
        setFormData({ email: '', password: '', phone: '' });
      }

      if (data.token) {
        const expirationTime = Date.now() + 15 * 24 * 60 * 60 * 1000;
        localStorage.setItem(
          'token',
          JSON.stringify({ value: data.token, expiry: expirationTime })
        );
      }

      localStorage.setItem('user_id', data?.userId);
      localStorage.setItem('userData', JSON.stringify(formData));
      navigate('/profile');

      handleOpenLogin();
    } catch (err) {
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full overflow-y-auto z-50 w-72 md:w-96 bg-white shadow-lg transition-transform duration-500 ease-in-out transform ${
        isUserLoginOpen
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      } rounded-2xl`}
    >
      <div className="pt-4 px-5 pb-2">
        <LuArrowLeft
          className="text-xl cursor-pointer"
          onClick={handleOpenLogin}
        />
      </div>
      <img src={loginImg} alt="Login Illustration" className="w-full h-auto" />
      <div className="bg-white rounded-t-3xl relative bottom-6 z-50 py-8 px-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 leading-6">
          {isSignup ? 'We’re excited to get you onboard!' : 'Welcome back!'}
        </h2>
        <p className="text-lg font-medium text-gray-700 mb-6">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Email ID
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="someone@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={isSignup ? 'Create password' : 'Enter your password'}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>
          {isSignup && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="1234567890"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-xs text-gray-600 leading-4"
                >
                  Accept terms and Conditions
                </label>
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex justify-center gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-2 w-full border rounded-lg border-gray-300 hover:bg-gray-100 transition">
            <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 w-full border rounded-lg border-gray-300 hover:bg-gray-100 transition">
            <FontAwesomeIcon icon={faFacebook} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          {isSignup ? (
            <>
              Already have an account?{' '}
              <span
                className="text-blue-500 font-medium cursor-pointer"
                onClick={toggleForm}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span
                className="text-blue-500 font-medium cursor-pointer"
                onClick={toggleForm}
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
