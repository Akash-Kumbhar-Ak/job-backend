import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import $ from 'jquery';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ workLocation: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [search, filters]);

  useEffect(() => {
    $('.job-card').each(function(i) {
      $(this).delay(i * 100).fadeIn(600);
    });
  }, [jobs]);

  const fetchJobs = async () => {
    const params = { search, ...filters };
    Object.keys(params).forEach(k => !params[k] && delete params[k]);
    const { data } = await api.get('/jobs', { params });
    setJobs(data);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      $('.mobile-filter').slideDown(300);
    } else {
      $('.mobile-filter').slideUp(300);
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">🚀 Job Portal</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold gradient-text mb-4">Find Your Dream Job</h2>
          <p className="text-gray-600 text-lg">Explore opportunities that match your skills</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 border border-gray-100">
          <input
            type="text"
            placeholder="🔍 Search by role..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl mb-4 focus:border-blue-500 focus:outline-none transition-all text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={toggleMobileMenu} className="md:hidden w-full bg-blue-600 text-white py-3 rounded-xl mb-4 font-semibold">Filter Jobs</button>
          <div className="mobile-filter hidden md:block">
            <select className="w-full md:w-auto p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all" value={filters.workLocation} onChange={(e) => setFilters({...filters, workLocation: e.target.value})}>
              <option value="">📍 All Locations</option>
              <option value="Onsite">🏢 Onsite</option>
              <option value="Remote">🏠 Remote</option>
              <option value="Hybrid">🔄 Hybrid</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6">
          {jobs.map(job => (
            <div key={job._id} className="job-card bg-white p-6 rounded-2xl shadow-lg card-hover border-l-4 border-blue-500 cursor-pointer" style={{display: 'none'}} onClick={() => navigate(`/jobs/${job._id}`)}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{job.title}</h2>
                  <p className="text-lg text-gray-600 mb-2">🏢 {job.company}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">📍 {job.jobLocation}</span>
                    <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">{job.workLocation}</span>
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">💼 {job.experience}</span>
                  </div>
                </div>
                <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">{job.status}</span>
              </div>
              
              <div className="mt-4 text-gray-600">
                <p className="line-clamp-2">{job.description}</p>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <span className="text-sm text-gray-500">📅 Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                <span className="text-blue-600 font-semibold">View Details →</span>
              </div>
            </div>
          ))}
        </div>
        
        {jobs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No jobs found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
