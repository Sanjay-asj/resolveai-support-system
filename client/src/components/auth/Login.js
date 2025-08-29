import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRole } from '../../utils/auth';
import api from '../../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      
      const role = getUserRole();
      if (role === 'agent') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/submit', { replace: true });
      }
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="password" placeholder="******************" name="password" value={password} onChange={onChange} minLength="6" required
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
            <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Need to register?
            </Link>
          </div>
        </form>
        <div className="text-center mt-4">
            <Link to="/auth" className="text-sm text-gray-500 hover:text-gray-700">
                &larr; Go Back
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
