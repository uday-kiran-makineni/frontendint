import  { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './UserHeader.module.css';
import logo from './assets/nobglogo.png'; // Import your logo image


const UserHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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
        <header className={styles.header}>
            <img src={logo} alt="MassMutual Logo" className={styles.logo} /> {/* Logo Image */}
            <nav className={styles.nav}>
                <ul className={styles.navLinks}>
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Plans</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className={styles.profile}>
                <img 
                    src="https://res.cloudinary.com/dfkfysygf/image/upload/v1709352028/profile_dohabp.svg"
                    alt="Profile"
                    className={styles.profilePic}
                    onClick={toggleDropdown} // Toggle dropdown on click
                />
                {isDropdownOpen && (
                    <div className={styles.dropdown}>
                        <ul>
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Settings</a></li>
                            <li><a href="#" onClick={handleLogout}>Log Out</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default UserHeader;
