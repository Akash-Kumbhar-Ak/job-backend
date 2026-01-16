import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  workLocation: { type: String, enum: ['Onsite', 'Remote', 'Hybrid'], required: true },
  jobLocation: { type: String, required: true },
  experience: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: { type: String, required: true },
  qualifications: { type: String, required: true },
  applicationLink: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
  postedDate: { type: Date, default: Date.now }
});

export default mongoose.model('Job', jobSchema);
