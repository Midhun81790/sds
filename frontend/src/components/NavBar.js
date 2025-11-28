import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="sds-nav">
      <Link to="/" className="brand">
        Smart Doubt Solver
      </Link>
      <div className="nav-links">
        <Link to="/doubts">Doubts</Link>
        <Link to="/analytics">Analytics</Link>
        {isAuthenticated && <Link to="/ask">Ask</Link>}
      </div>
      <div className="nav-actions">
        {isAuthenticated ? (
          <>
            <span className="welcome">Hi, {user?.name}</span>
            <button type="button" onClick={logout} className="secondary-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="primary-btn">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
