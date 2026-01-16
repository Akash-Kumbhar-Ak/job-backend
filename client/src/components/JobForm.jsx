import { useState, useEffect } from 'react';
import api from '../utils/api';
import $ from 'jquery';

export default function JobForm({ job, onClose }) {
  const [formData, setFormData] = useState({
    title: '', company: '', workLocation: 'Onsite', jobLocation: '', experience: '', description: '', responsibilities: '', qualifications: '', applicationLink: '', status: 'Active'
  });

  useEffect(() => {
    if (job) setFormData(job);
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    $('.form-submit-btn').text('Saving...').prop('disabled', true);
    if (job) {
      await api.put(`/admin/jobs/${job._id}`, formData);
    } else {
      await api.post('/admin/jobs', formData);
    }
    $('.form-content').fadeOut(200, onClose);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="form-content bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold gradient-text">{job ? '✏️ Edit Job' : '➕ Add New Job'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-3xl transition-colors">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">💼 Role</label>
            <input name="title" placeholder="e.g., Senior Software Engineer" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">🏢 Company Name</label>
            <input name="company" placeholder="e.g., Google Inc." className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all" value={formData.company} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">🏢 Work Location</label>
              <select name="workLocation" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all" value={formData.workLocation} onChange={handleChange}>
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">📍 Job Location</label>
              <input name="jobLocation" placeholder="e.g., New York, USA" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all" value={formData.jobLocation} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">💼 Experience</label>
            <select name="experience" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all" value={formData.experience} onChange={handleChange} required>
              <option value="">Select Experience</option>
              <option value="Freshers">Freshers</option>
              <option value="0-1 years">0-1 years</option>
              <option value="2-4 years">2-4 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">📝 Description</label>
            <textarea name="description" placeholder="Job description..." className="w-full p-3 border-2 border-gray-200 rounded-xl h-28 focus:border-blue-500 focus:outline-none transition-all" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">✅ Responsibilities</label>
            <textarea name="responsibilities" placeholder="Key responsibilities..." className="w-full p-3 border-2 border-gray-200 rounded-xl h-28 focus:border-blue-500 focus:outline-none transition-all" value={formData.responsibilities} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">🎓 Qualifications</label>
            <textarea name="qualifications" placeholder="Required qualifications..." className="w-full p-3 border-2 border-gray-200 rounded-xl h-28 focus:border-blue-500 focus:outline-none transition-all" value={formData.qualifications} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">🔗 Application Link</label>
            <input name="applicationLink" placeholder="https://..." className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all" value={formData.applicationLink} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">🟢 Status</label>
            <select name="status" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="submit" className="form-submit-btn flex-1 btn-gradient text-white p-4 rounded-xl font-bold text-lg shadow-lg">Save Job</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 p-4 rounded-xl font-bold text-lg hover:bg-gray-400 transition-all">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
