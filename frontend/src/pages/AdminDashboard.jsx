import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const departments = [
  'Water', 'WiFi', 'Electric', 'Roads and Pits', 'Tree', 'Sanitation', 'Security', 'Other'
];

const urgencies = ['Low', 'Medium', 'High'];
const statuses = ['New', 'Pending', 'Resolved'];

const statusColors = {
  New: 'bg-blue-100 text-blue-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Resolved: 'bg-green-100 text-green-800',
};

const urgencyColors = {
  Low: 'bg-blue-100 text-blue-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-red-100 text-red-800',
};

const AdminDashboard = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    location: '',
    status: '',
    urgency: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token || userRole !== 'admin') {
      navigate('/login');
      return;
    }

    fetchProblems();
  }, [navigate, filters]);

  const fetchProblems = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const res = await fetch(`/api/problems?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        throw new Error('Failed to fetch problems');
      }

      const data = await res.json();
      setProblems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleStatusChange = async (problemId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/problems/${problemId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      // Update the problem in the local state
      setProblems(prev => prev.map(problem =>
        problem._id === problemId
          ? { ...problem, status: newStatus }
          : problem
      ));
    } catch (err) {
      setError('Failed to update status');
    }
  };



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusCounts = () => {
    const counts = { New: 0, Pending: 0, Resolved: 0 };
    problems.forEach(problem => {
      counts[problem.status] = (counts[problem.status] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <main className="w-full px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Problem Management Dashboard</h1>
          <p className="text-gray-600">Manage and track all reported problems from students</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-blue-600">{problems.length}</div>
            <div className="text-gray-600">Total Problems</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.New}</div>
            <div className="text-gray-600">New Problems</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.Pending}</div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">{statusCounts.Resolved}</div>
            <div className="text-gray-600">Resolved</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                placeholder="Search location..."
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
              <select
                value={filters.urgency}
                onChange={(e) => handleFilterChange('urgency', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">All Urgency</option>
                {urgencies.map(urgency => (
                  <option key={urgency} value={urgency}>{urgency}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">All Problems ({problems.length})</h2>
          </div>

          {error && <div className="p-4 text-red-600">{error}</div>}

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : problems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No problems found matching the current filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problem</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {problems.map((problem) => (
                    <tr key={problem._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{problem.problemName}</div>
                          <div className="text-sm text-gray-500 line-clamp-2">{problem.description}</div>
                          {problem.image && (
                            <img
                              src={`http://localhost:5000/uploads/${problem.image}`}
                              alt="Problem"
                              className="w-16 h-16 object-cover rounded mt-2"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{problem.submittedBy?.name || 'Unknown'}</div>
                        <div className="text-sm text-gray-500">{problem.submittedBy?.email || 'No email'}</div>
                        <div className="text-sm text-gray-500">{problem.submittedBy?.regNo || 'No Reg No'}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{problem.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{problem.location}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${urgencyColors[problem.urgency] || 'bg-gray-100 text-gray-800'}`}>
                          {problem.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[problem.status] || 'bg-gray-100 text-gray-800'}`}>
                          {problem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(problem.submittedAt)}</td>
                      <td className="px-6 py-4">
                        <select
                          value={problem.status}
                          onChange={(e) => handleStatusChange(problem._id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 