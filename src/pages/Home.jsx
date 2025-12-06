import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <div className="card" style={{ textAlign: "center", padding: "40px" }}>
        <h1>Welcome to Job Application Tracker</h1>
        <p style={{ fontSize: "18px", color: "var(--muted)" }}>
          Organize your job hunt with ease — add, search, filter, and track applications all in one place.
        </p>

        {/* Shows different button depending on login state */}
        {user ? (
          <Link to="/dashboard" className="button" style={{ marginTop: "20px" }}>
            Go to Dashboard
          </Link>
        ) : (
          <Link to="/login" className="button" style={{ marginTop: "20px" }}>
            Login to Get Started
          </Link>
        )}
      </div>

      {/* Features Section */}
      <div className="grid cols-3" style={{ marginTop: "30px" }}>
        <div className="card">
          <h3>Add Applications</h3>
          <p>Quickly log company, role, status, and notes with our easy form.</p>
        </div>
        <div className="card">
          <h3>Track Progress</h3>
          <p>View all applications in a searchable, sortable table with filters and pagination.</p>
        </div>
        <div className="card">
          <h3>Dashboard Insights</h3>
          <p>See summaries of applied, interviews, offers, and rejections at a glance.</p>
        </div>
      </div>
    </div>
  );
}
