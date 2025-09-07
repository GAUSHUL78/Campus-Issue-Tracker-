import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const departments = [
  'Water',
  'WiFi',
  'Electric',
  'Roads and Pits',
  'Tree',
  'Sanitation',
  'Security',
  'Other',
];

const urgencies = ['Low', 'Medium', 'High'];

const ReportProblem = () => {
  const [form, setForm] = useState({
    problemName: '',
    department: '',
    location: '',
    urgency: 'Medium',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // 🔐 Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setImagePreview(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('problemName', form.problemName);
    formData.append('department', form.department);
    formData.append('location', form.location);
    formData.append('urgency', form.urgency);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please login again.');
        return;
      }

      console.log('Submitting form with token:', token);
      const res = await fetch('/api/problems', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - browser will set it automatically
        },
      });

      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);

      if (res.ok) {
        setSuccess('Problem reported successfully! Redirecting to dashboard...');
        setForm({
          problemName: '',
          department: '',
          location: '',
          urgency: 'Medium',
          description: '',
          image: null,
        });
        setImagePreview(null); // Clear preview on success
        setTimeout(() => {
          setSuccess('');
          navigate('/student');
        }, 2000);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white shadow rounded-lg mt-24">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Report a Problem</h1>
      {error && <p className="text-red-600 text-sm sm:text-base">{error}</p>}
      {success && <p className="text-green-600 text-sm sm:text-base">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label className="block font-semibold text-sm sm:text-base mb-2">Problem Name:</label>
          <input
            type="text"
            name="problemName"
            value={form.problemName}
            onChange={handleChange}
            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-sm sm:text-base mb-2">Department:</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
            required
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold text-sm sm:text-base mb-2">Location:</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-sm sm:text-base mb-2">Urgency:</label>
          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
            required
          >
            {urgencies.map((urgency) => (
              <option key={urgency} value={urgency}>
                {urgency}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold text-sm sm:text-base mb-2">Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold text-sm sm:text-base mb-2">Image (required):</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm sm:text-base"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Please upload a clear image of the problem</p>
        </div>
        <div className="mt-4">
          <label className="block font-semibold text-sm sm:text-base mb-2">Image Preview:</label>
          {imagePreview ? (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Problem preview"
                className="max-w-full sm:max-w-sm h-32 sm:h-48 object-cover rounded-md border border-gray-200"
              />
              <p className="text-xs text-gray-500 mt-1">Image will be uploaded with your report</p>
            </div>
          ) : (
            <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md text-center">
              <p className="text-gray-500 text-sm sm:text-base">No image selected</p>
              <p className="text-xs text-gray-400">Select an image above to see preview</p>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 text-sm sm:text-base font-semibold transition-colors"
        >
          {loading ? 'Reporting...' : 'Report Problem'}
        </button>
      </form>
    </div>
  );
};

export default ReportProblem;
