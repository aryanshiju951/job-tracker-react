import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ApplicationsContext = createContext(null);

const SAMPLE = [
  {
    id: crypto.randomUUID(),
    company: 'Amazon',
    title: 'Frontend Developer',
    type: 'Full-time',
    status: 'Applied',
    location: 'Hyderabad',
    date: '2025-12-01',
    notes: 'React focus'
  },
  {
    id: crypto.randomUUID(),
    company: 'Google',
    title: 'Software Intern',
    type: 'Internship',
    status: 'Interview Scheduled',
    location: 'Bengaluru',
    date: '2025-12-02',
    notes: 'Phone screen done'
  }
];

export function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    const raw = localStorage.getItem('jat_applications');
    return raw ? JSON.parse(raw) : SAMPLE;
  });

  useEffect(() => {
    localStorage.setItem('jat_applications', JSON.stringify(applications));
  }, [applications]);

  const addApplication = (app) => {
    setApplications((prev) => [{ ...app, id: crypto.randomUUID() }, ...prev]);
  };

  const updateApplication = (id, patch) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const value = useMemo(
    () => ({ applications, addApplication, updateApplication, deleteApplication }),
    [applications]
  );

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export const useApplications = () => useContext(ApplicationsContext);
