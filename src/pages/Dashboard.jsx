import { useMemo } from 'react';
import { useApplications } from '../context/ApplicationsContext.jsx';

export default function Dashboard() {
  const { applications } = useApplications();

  const summary = useMemo(() => {
    const total = applications.length;
    const byStatus = (s) => applications.filter((a) => a.status === s).length;
    const lastFive = applications.slice(0, 5);
    return {
      total,
      applied: byStatus('Applied'),
      interview: byStatus('Interview Scheduled'),
      selected: byStatus('Selected'),
      rejected: byStatus('Rejected'),
      lastFive
    };
  }, [applications]);

  return (
    <>
      <div className="grid cols-4">
        <div className="card"><h3>Total Applications</h3><p>{summary.total}</p></div>
        <div className="card"><h3>Applied</h3><p>{summary.applied}</p></div>
        <div className="card"><h3>Interview Scheduled</h3><p>{summary.interview}</p></div>
        <div className="card"><h3>Selected</h3><p>{summary.selected}</p></div>
      </div>
      <div className="grid cols-2">
        <div className="card"><h3>Rejected</h3><p>{summary.rejected}</p></div>
        <div className="card">
          <h3>Last 5 applications</h3>
          <ul>
            {summary.lastFive.map((a) => (
              <li key={a.id}>
                {a.company} — {a.title} <span className="badge">{a.status}</span>
              </li>
            ))}
            {summary.lastFive.length === 0 && <li className="label">No recent applications.</li>}
          </ul>
        </div>
      </div>
    </>
  );
}
