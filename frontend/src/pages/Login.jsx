import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Login page for both students and admins
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [userType, setUserType] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Login logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include'
      });
      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error('Invalid server response.');
      }
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userName', data.name);

      setSuccess('Login successful!');
      // Redirect based on role
      setTimeout(() => {
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/student');
        }
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 pt-16">
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">Welcome back!</h2>
        <h3 className="text-lg sm:text-xl font-semibold mb-6 text-center">Login</h3>
        <div className="mb-4 flex justify-center gap-2 sm:gap-4">
          <button
            type="button"
            className={`px-3 sm:px-4 py-2 rounded font-semibold border text-sm sm:text-base ${userType === 'student' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
            onClick={() => setUserType('student')}
          >
            Student Login
          </button>
          <button
            type="button"
            className={`px-3 sm:px-4 py-2 rounded font-semibold border text-sm sm:text-base ${userType === 'admin' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
            onClick={() => setUserType('admin')}
          >
            Admin Login
          </button>
        </div>
        {error && <div className="mb-4 text-red-500 text-sm sm:text-base">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm sm:text-base">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm sm:text-base">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:py-3 border rounded focus:outline-none focus:ring text-sm sm:text-base"
            required
            placeholder="example@sliet.ac.in"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium text-sm sm:text-base">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:py-3 border rounded focus:outline-none focus:ring text-sm sm:text-base"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded hover:bg-blue-700 transition text-sm sm:text-base font-semibold"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-6 text-center text-gray-600 text-sm sm:text-base">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login; 