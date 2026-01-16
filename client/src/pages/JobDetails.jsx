import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import $ from 'jquery';

export default function JobDetails() {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const { data } = await api.get(`/jobs/${id}`);
      setJob(data);
      $('.job-detail-card').hide().fadeIn(600);
    } catch (error) {
      navigate('/');
    }
  };

  if (!job) return <div className="min-h-screen flex items-center justify-center"><div className="text-xl">Loading...</div></div>;

  return (
    <div className="min-h-screen">
      <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">🚀 Job Portal</h1>
            <button onClick={() => navigate('/')} className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-md">← Back to Jobs</button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="job-detail-card max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl border-l-4 border-blue-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">{job.title}</h1>
              <p className="text-2xl text-gray-600 mb-4">🏢 {job.company}</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold text-sm">📍 {job.jobLocation}</span>
                <span className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full font-semibold text-sm">{job.workLocation}</span>
                <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold text-sm">💼 {job.experience}</span>
              </div>
            </div>
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md">{job.status}</span>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
              <h2 className="font-bold text-2xl mb-4 text-blue-600 flex items-center gap-2">📝 Description</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{job.description}</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl">
              <h2 className="font-bold text-2xl mb-4 text-purple-600 flex items-center gap-2">✅ Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{job.responsibilities}</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl">
              <h2 className="font-bold text-2xl mb-4 text-green-600 flex items-center gap-2">🎓 Qualifications</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{job.qualifications}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-6 pt-8 border-t-2 border-gray-200">
            <span className="text-gray-500 text-sm">📅 Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
            <a href={job.applicationLink} target="_blank" rel="noopener noreferrer" className="btn-gradient text-white px-10 py-4 rounded-xl font-bold shadow-lg text-xl w-full md:w-auto text-center">Apply Now →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
