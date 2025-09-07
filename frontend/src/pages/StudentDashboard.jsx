import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  Resolved: 'bg-green-100',
  Pending: 'bg-yellow-100',
};
const statusTextColors = {
  Resolved: 'text-green-700',
  Pending: 'text-yellow-700',
};

const urgencyColors = {
  Low: 'bg-blue-100 text-blue-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-red-100 text-red-800',
};

const StudentDashboard = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProblems = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/problems/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let data;
        try {
          data = await res.json();
        } catch {
          throw new Error('Server did not return valid JSON.');
        }
        if (!res.ok) {
          if (res.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
          throw new Error(data.message || 'Failed to fetch problems');
        }
        console.log('Problems data:', data);
        setProblems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, [navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDeleteProblem = async (problemId) => {
    if (!window.confirm('Are you sure you want to delete this complaint? This action cannot be undone.')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/problems/${problemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete problem');
      }

      // Remove the problem from the local state
      setProblems(problems.filter(problem => problem._id !== problemId));

      // Show success message
      alert('Complaint deleted successfully!');
    } catch (error) {
      console.error('Error deleting problem:', error);
      alert(`Error deleting complaint: ${error.message}`);
    }
  };

  const getStatusCounts = () => {
    const counts = { Pending: 0, Resolved: 0 };
    const urgencyCounts = { Low: 0, Medium: 0, High: 0 };

    problems.forEach(problem => {
      if (problem.status === 'Pending' || problem.status === 'Resolved') {
        counts[problem.status] = (counts[problem.status] || 0) + 1;
      }
      urgencyCounts[problem.urgency] = (urgencyCounts[problem.urgency] || 0) + 1;
    });

    return { statusCounts: counts, urgencyCounts };
  };

  const { statusCounts, urgencyCounts } = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <main className="w-full px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">My Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">Hello! Here you can see the status of your complaints.</p>
          </div>
          <button
            className="w-full sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold shadow hover:bg-indigo-700 transition text-sm sm:text-base"
            onClick={() => navigate('/report-problem')}
          >
            + Submit New Complaint
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">{problems.length}</div>
            <div className="text-gray-600 text-sm sm:text-base">Total Complaints</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{statusCounts.Pending}</div>
            <div className="text-gray-600 text-sm sm:text-base">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 sm:col-span-2 md:col-span-1">
            <div className="text-xl sm:text-2xl font-bold text-green-600">{statusCounts.Resolved}</div>
            <div className="text-gray-600 text-sm sm:text-base">Resolved</div>
          </div>
        </div>

        {/* Recent Activity Summary */}
        {problems.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-8">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {problems
                .filter(problem => problem.status === 'Pending' || problem.status === 'Resolved')
                .slice(0, 3)
                .map((problem) => (
                  <div key={problem._id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 truncate text-sm sm:text-base">{problem.problemName}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[problem.status] || 'bg-gray-100 text-gray-800'}`}>
                        {problem.status}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{problem.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{problem.department}</span>
                      <span>{formatDate(problem.submittedAt)}</span>
                    </div>
                  </div>
                ))}
            </div>
            {problems.filter(problem => problem.status === 'Pending' || problem.status === 'Resolved').length > 3 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => document.getElementById('problems-section').scrollIntoView({ behavior: 'smooth' })}
                  className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
                >
                  View all {problems.filter(problem => problem.status === 'Pending' || problem.status === 'Resolved').length} active complaints →
                </button>
              </div>
            )}
          </div>
        )}

        {error && <div className="mb-4 text-red-500">{error}</div>}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : problems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No complaints submitted yet.</div>
            <button
              onClick={() => navigate('/report-problem')}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Your First Report
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">All My Complaints ({problems.length})</h2>
            </div>
            <div id="problems-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
              {problems.map((problem) => {
                console.log('Problem image:', problem.image);
                return (
                  <div key={problem._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Image Section */}
                    {problem.image && (
                      <div className="h-32 sm:h-48 overflow-hidden">
                        <img
                          src={`http://localhost:5000/uploads/${problem.image}`}
                          alt={problem.problemName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', e.target.src);
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-4 sm:p-6">
                      {/* Header with Status and Delete Button */}
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate">{problem.problemName}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusTextColors[problem.status] || 'text-gray-700'} ${statusColors[problem.status] || 'bg-gray-100'}`}>
                            {problem.status}
                          </span>
                          <button
                            onClick={() => handleDeleteProblem(problem._id)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                            title="Delete complaint"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">
                        {problem.description}
                      </p>

                      {/* Details Grid */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-gray-500">Department:</span>
                          <span className="font-medium text-gray-700">{problem.department}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-gray-500">Location:</span>
                          <span className="font-medium text-gray-700">{problem.location}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-gray-500">Urgency:</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${urgencyColors[problem.urgency] || 'bg-gray-100 text-gray-800'}`}>
                            {problem.urgency}
                          </span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Submitted: {formatDate(problem.submittedAt)}</span>
                          <span className="text-gray-400">ID: {problem._id.slice(-8)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard; 