import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key';

const MotorPolicyDelete = () => {
    const [policyNumber, setPolicyNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Get credentials from localStorage
    const getAuthCredentials = () => {
        const username = localStorage.getItem('username');
        const encryptedPassword = localStorage.getItem('password');
        if (username && encryptedPassword) {
            const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
            const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            return { username, password: decryptedPassword };
        }
        return { username: '', password: '' };
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setError(''); // Clear previous errors

        if (!policyNumber) {
            setError("Policy number is required");
            return;
        }

        try {
            const { username, password } = getAuthCredentials();
            const response = await axios.delete(`http://localhost:8081/api/motorinsurances/${policyNumber}`, {
                headers: {
                    'Authorization': 'Basic ' + btoa(`${username}:${password}`)
                }
            });

            if (response.status === 204) {
                setMessage(`Policy deleted successfully: ${policyNumber}`);
                setPolicyNumber(''); // Clear the input field after successful deletion
            }
        } catch (error) {
            console.error("Error deleting policy:", error);
            if (error.response && error.response.status === 403) {
                setError("You don't have permission to delete this policy.");
            } else if (error.response && error.response.status === 404) {
                setError("Policy not found.");
            } else {
                setError("Error deleting policy. Please try again.");
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '30vh auto', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Delete Motor Insurance Policy</h1>
            <form onSubmit={handleDelete}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="policyNumber" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Policy Number:</label>
                    <input
                        type="text"
                        id="policyNumber"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#002451', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
                    Delete Policy
                </button>
            </form>
            {message && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{message}</p>}
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default MotorPolicyDelete;
