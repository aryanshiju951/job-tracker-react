import { useMemo, useState } from 'react';
import { useApplications } from '../context/ApplicationsContext.jsx';
import { format } from 'date-fns';

const TYPES = ['All', 'Full-time', 'Internship', 'Part-time', 'Contract'];
const STATUS = ['All', 'Applied', 'Interview Scheduled', 'Rejected', 'Selected'];

const PAGE_SIZE = 5;

export default function Applications() {
  const { applications, deleteApplication, updateApplication } = useApplications();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortKey, setSortKey] = useState(null); // 'company' | 'date'
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editNotes, setEditNotes] = useState('');

  const filtered = useMemo(() => {
    let list = applications;

    // Search by company or job title (case-insensitive)
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) => a.company.toLowerCase().includes(q) || a.title.toLowerCase().includes(q)
      );
    }

    // Filter by type
    if (typeFilter !== 'All') {
      list = list.filter((a) => a.type === typeFilter);
    }

    // Filter by status
    if (statusFilter !== 'All') {
      list = list.filter((a) => a.status === statusFilter);
    }

    // Sorting
    if (sortKey === 'company') {
      list = [...list].sort((a, b) => a.company.localeCompare(b.company));
    } else if (sortKey === 'date') {
      list = [...list].sort((a, b) => {
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return db - da; // Newest -> Oldest
      });
    }

    return list;
  }, [applications, query, typeFilter, statusFilter, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetSorting = () => setSortKey(null);

  const startEdit = (app) => {
    setEditingId(app.id);
    setEditNotes(app.notes || '');
  };

  const saveEdit = (id) => {
    updateApplication(id, { notes: editNotes });
    setEditingId(null);
    setEditNotes('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNotes('');
  };

  // Reset page when filters/search change
  const onQueryChange = (v) => { setQuery(v); setPage(1); };
  const onTypeChange = (v) => { setTypeFilter(v); setPage(1); };
  const onStatusChange = (v) => { setStatusFilter(v); setPage(1); };

  return (
    <div className="card">
      <h2>Applications</h2>

      <div className="controls">
        <input
          className="input"
          placeholder="Search by company or job title…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          style={{ flex: 1, minWidth: 240 }}
        />
        <select className="select" value={typeFilter} onChange={(e) => onTypeChange(e.target.value)}>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="select" value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
          {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="controls">
        <button className="button secondary" onClick={() => setSortKey('company')}>Sort by Company (A–Z)</button>
        <button className="button secondary" onClick={() => setSortKey('date')}>Sort by Applied Date (Newest → Oldest)</button>
        <button className="button secondary" onClick={resetSorting}>Reset Sorting</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Job Title</th>
            <th>Job Type</th>
            <th>Status</th>
            <th>Location</th>
            <th>Applied Date</th>
            <th style={{ width: 180 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {current.map((a) => (
            <tr key={a.id}>
              <td>{a.company}</td>
              <td>{a.title}</td>
              <td><span className="badge">{a.type}</span></td>
              <td><span className="badge">{a.status}</span></td>
              <td>{a.location}</td>
              <td>{a.date ? format(new Date(a.date), 'yyyy-MM-dd') : '-'}</td>
              <td>
                {editingId === a.id ? (
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input
                      className="input"
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Edit notes"
                    />
                    <button className="button" onClick={() => saveEdit(a.id)}>Save</button>
                    <button className="button secondary" onClick={cancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="button secondary" onClick={() => startEdit(a)}>Edit</button>
                    <button className="button danger" onClick={() => deleteApplication(a.id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {current.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="controls" style={{ justifyContent: 'space-between' }}>
        <div className="label">Page {page} of {totalPages}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="button secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >Previous</button>
          <button
            className="button secondary"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >Next</button>
        </div>
      </div>
    </div>
  );
}
