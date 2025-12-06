import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setOpen(false); // close menu after logout
  };

  return (
    <nav className="navbar">
      <div className="logo">Job Tracker</div>
      <div className="spacer" />

      {/* Hamburger toggle (only visible on mobile via CSS) */}
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Links container */}
      <div className={`navbar-links ${open ? 'open' : ''}`}>
        <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/dashboard" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
        <NavLink to="/add-application" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Add Application</NavLink>
        <NavLink to="/applications" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Applications</NavLink>

        {user ? (
          <>
            <span className="badge">{user.email} ({user.role})</span>
            <button className="button secondary" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
        )}
      </div>
    </nav>
  );
}
