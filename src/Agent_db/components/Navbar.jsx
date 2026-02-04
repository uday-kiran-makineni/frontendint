import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all stored data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('userRoles');
    localStorage.removeItem('userId');
    localStorage.removeItem('password');
    localStorage.removeItem('totalHealthPolicies');
    localStorage.removeItem('totalHealthPremium');
    localStorage.removeItem('totalLifePolicies');
    localStorage.removeItem('totalLifePremium');
    localStorage.removeItem('totalMotorPolicies');
    localStorage.removeItem('totalMotorPremium');
    localStorage.removeItem('totalTravelPolicies');
    localStorage.removeItem('totalTravelPremium');
    
    // Redirect to login page
    navigate('/Login');
  };

  return (
    <nav className={styles.navbar} aria-label="Primary Navigation">
      <div className={styles.logo}>
        <NavLink to="/dashboard" aria-label="Navigate to Dashboard" className={styles.logoLink}>
          <h1>PolicyManager</h1> {/* Changed to h1 for better semantic structure */}
        </NavLink>
      </div>
      <div className={styles.logout}>
        <button 
          className={styles.logoutButton} 
          onClick={handleLogout} 
          aria-label="Logout" 
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
