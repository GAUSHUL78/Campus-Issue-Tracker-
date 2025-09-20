import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const branches = [
  'CSE', 'ECE', 'ME', 'CE', 'EE', 'CH', 'BT', 'PE', 'Other'
];

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    regNo: '',
    branch: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('https://campus-issue-tracker-ezpa.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      let data;
      try {
        data = await res.json();
      } catch (error) {
        console.log(error);
        throw new Error('Server did not return valid JSON.');
      }
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setSuccess('Thank you for registration!');
      setForm({ name: '', regNo: '', branch: '', email: '', password: '' });
      setTimeout(() => {
        setSuccess('');
        navigate('/student');
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
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">Sign Up</h2>
        <h3 className="text-lg sm:text-xl font-semibold mb-6 text-center">Student Register</h3>
        {error && <div className="mb-4 text-red-500 text-sm sm:text-base">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm sm:text-base">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm sm:text-base">Student Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:py-3 border rounded focus:outline-none focus:ring text-sm sm:text-base"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm sm:text-base">Reg No</label>
          <input
            type="text"
            name="regNo"
            value={form.regNo}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:py-3 border rounded focus:outline-none focus:ring text-sm sm:text-base"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm sm:text-base">Branch</label>
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:py-3 border rounded focus:outline-none focus:ring text-sm sm:text-base"
            required
          >
            <option value="">Select Branch</option>
            {branches.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
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
            minLength={6}
            placeholder="At least 6 characters"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 sm:py-3 rounded hover:bg-green-700 transition text-sm sm:text-base font-semibold"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="mt-6 text-center text-gray-600 text-sm sm:text-base">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register; 