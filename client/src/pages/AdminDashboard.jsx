import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { removeToken } from '../utils/auth';
import JobForm from '../components/JobForm';
import $ from 'jquery';

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data } = await api.get('/admin/jobs');
    setJobs(data);
    setTimeout(() => {
      $('tbody tr').each(function(i) {
        $(this).delay(i * 50).fadeIn(300);
      });
    }, 100);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this job?')) {
      await api.delete(`/admin/jobs/${id}`);
      $(`tr[data-id="${id}"]`).fadeOut(300, () => fetchJobs());
    }
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setShowForm(true);
    $('.modal-overlay').fadeIn(300);
  };

  const handleFormClose = () => {
    $('.modal-overlay').fadeOut(300, () => {
      setShowForm(false);
      setEditJob(null);
    });
    fetchJobs();
  };

  const handleAddNew = () => {
    setShowForm(true);
    $('.modal-overlay').fadeIn(300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold">🛠️ Admin Dashboard</h1>
            <div className="flex gap-4">
              <a href="/" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">View Public Site</a>
              <button onClick={handleLogout} className="bg-red-500 px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-all transform hover:scale-105">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold gradient-text">Manage Jobs</h2>
          <button onClick={handleAddNew} className="btn-gradient text-white px-8 py-3 rounded-xl font-bold shadow-lg text-lg">➕ Add Job</button>
        </div>

        {showForm && (
          <div className="modal-overlay" style={{display: 'none'}}>
            <JobForm job={editJob} onClose={handleFormClose} />
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left hidden md:table-cell">Company</th>
                  <th className="p-4 text-left hidden md:table-cell">Job Location</th>
                  <th className="p-4 text-left hidden lg:table-cell">Work Location</th>
                  <th className="p-4 text-left hidden lg:table-cell">Experience</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left hidden md:table-cell">Posted</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job._id} data-id={job._id} className="border-t hover:bg-blue-50 transition-colors" style={{display: 'none'}}>
                    <td className="p-4 font-semibold">{job.title}</td>
                    <td className="p-4 hidden md:table-cell">{job.company}</td>
                    <td className="p-4 hidden md:table-cell">{job.jobLocation}</td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">{job.workLocation}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">{job.experience}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 hidden md:table-cell">{new Date(job.postedDate).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(job)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 text-sm font-semibold">Edit</button>
                        <button onClick={() => handleDelete(job._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all transform hover:scale-105 text-sm font-semibold">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
