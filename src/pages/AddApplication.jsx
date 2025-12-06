import { useState } from 'react';
import { useApplications } from '../context/ApplicationsContext.jsx';
import { required } from '../utils/validators.js';

const TYPES = ['Full-time', 'Internship', 'Part-time', 'Contract'];
const STATUS = ['Applied', 'Interview Scheduled', 'Rejected', 'Selected'];

const initialForm = {
  company: '',
  title: '',
  type: '',
  status: '',
  location: '',
  date: '',
  notes: ''
};

export default function AddApplication() {
  const { addApplication } = useApplications();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const e = {};
    if (!required(form.company)) e.company = 'Company Name is required.';
    if (!required(form.title)) e.title = 'Job Title is required.';
    if (!required(form.type)) e.type = 'Job Type is required.';
    if (!required(form.status)) e.status = 'Status is required.';
    if (!required(form.location)) e.location = 'Location is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    if (!validate()) return;
    addApplication(form);
    setForm(initialForm);
    setErrors({});
    setMessage('Application added!');
    setTimeout(() => setMessage(''), 2500);
  };

  return (
    <div className="card">
      <h2>Add Job Application</h2>
      <form onSubmit={handleSubmit} className="grid cols-2">
        <div className="field">
          <div className="label">Company Name</div>
          <input className="input" value={form.company} onChange={(e) => onChange('company', e.target.value)} />
          {errors.company && <div className="error">{errors.company}</div>}
        </div>

        <div className="field">
          <div className="label">Job Title</div>
          <input className="input" value={form.title} onChange={(e) => onChange('title', e.target.value)} />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div className="field">
          <div className="label">Job Type</div>
          <select className="select" value={form.type} onChange={(e) => onChange('type', e.target.value)}>
            <option value="">Select type</option>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.type && <div className="error">{errors.type}</div>}
        </div>

        <div className="field">
          <div className="label">Status</div>
          <select className="select" value={form.status} onChange={(e) => onChange('status', e.target.value)}>
            <option value="">Select status</option>
            {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.status && <div className="error">{errors.status}</div>}
        </div>

        <div className="field">
          <div className="label">Location</div>
          <input className="input" value={form.location} onChange={(e) => onChange('location', e.target.value)} />
          {errors.location && <div className="error">{errors.location}</div>}
        </div>

        <div className="field">
          <div className="label">Applied Date</div>
          <input className="input" type="date" value={form.date} onChange={(e) => onChange('date', e.target.value)} />
        </div>

        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <div className="label">Notes (optional)</div>
          <textarea className="textarea" rows={3} value={form.notes} onChange={(e) => onChange('notes', e.target.value)} />
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8 }}>
          <button className="button" type="submit">Add Application</button>
          {message && <span className="badge" style={{ borderColor: 'var(--accent-2)', color: 'var(--accent-2)' }}>{message}</span>}
        </div>
      </form>
    </div>
  );
}
