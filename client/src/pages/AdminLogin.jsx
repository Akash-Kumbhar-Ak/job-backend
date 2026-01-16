import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { setToken } from '../utils/auth';
import $ from 'jquery';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    $('.login-form').addClass('opacity-50');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setToken(data.token);
      $('.login-form').fadeOut(300, () => navigate('/admin/dashboard'));
    } catch (err) {
      setError('Invalid credentials');
      $('.login-form').removeClass('opacity-50');
      $('.error-msg').hide().fadeIn(400);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="login-form bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-4xl font-bold gradient-text">Admin Login</h2>
          <p className="text-gray-500 mt-2">Access your dashboard</p>
        </div>
        {error && <div className="error-msg bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="admin@jobportal.com"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full btn-gradient text-white p-4 rounded-xl font-bold text-lg shadow-lg">Login</button>
        </form>
        <a href="/" className="block text-center mt-6 text-blue-600 hover:text-purple-600 font-semibold transition-colors">← Back to Jobs</a>
      </div>
    </div>
  );
}
