import React, { useState } from 'react';
import axios from 'axios';
import styles from './HealthForm.module.css';

const HealthForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    policyNumber: '',
    userId: localStorage.getItem('userId') || '',
    userEmail: '',
    mobileNumber: '',
    coverageAmount: '',
    premiumAmount: '',
    paymentFrequency: 'Monthly',
    beneficiaryDetails: '',
    claimLimit: '',
    policyType: 'Individual',
    termsAndConditions: '',
    preExistingDiseases: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.policyNumber) newErrors.policyNumber = 'Policy Number is required.';
    if (!formData.userEmail) newErrors.userEmail = 'User Email is required.';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile Number is required.';
    if (!formData.coverageAmount) newErrors.coverageAmount = 'Coverage Amount is required.';
    if (!formData.premiumAmount) newErrors.premiumAmount = 'Premium Amount is required.';
    if (!formData.beneficiaryDetails) newErrors.beneficiaryDetails = 'Beneficiary Details are required.';
    if (!formData.claimLimit) newErrors.claimLimit = 'Claim Limit is required.';
    if (!formData.termsAndConditions) newErrors.termsAndConditions = 'Terms and Conditions are required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.post('http://localhost:8081/api/healthpolicies', formData);
      setMessage('Health policy saved successfully!');
      if (onSuccess) onSuccess();
      setFormData({
        policyNumber: '',
        userId: localStorage.getItem('userId') || '',
        userEmail: '',
        mobileNumber: '',
        coverageAmount: '',
        premiumAmount: '',
        paymentFrequency: 'Monthly',
        beneficiaryDetails: '',
        claimLimit: '',
        policyType: 'Individual',
        termsAndConditions: '',
        preExistingDiseases: ''
      });
    } catch (error) {
      setMessage('Error saving health policy. Please try again.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Health Insurance Form</h2>
      <label>Policy Number</label>
      <input name="policyNumber" value={formData.policyNumber} onChange={handleChange} />
      {errors.policyNumber && <span className={styles.error}>{errors.policyNumber}</span>}
      <label>User Email</label>
      <input name="userEmail" value={formData.userEmail} onChange={handleChange} />
      {errors.userEmail && <span className={styles.error}>{errors.userEmail}</span>}
      <label>Mobile Number</label>
      <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
      {errors.mobileNumber && <span className={styles.error}>{errors.mobileNumber}</span>}
      <label>Coverage Amount</label>
      <input name="coverageAmount" value={formData.coverageAmount} onChange={handleChange} />
      {errors.coverageAmount && <span className={styles.error}>{errors.coverageAmount}</span>}
      <label>Premium Amount</label>
      <input name="premiumAmount" value={formData.premiumAmount} onChange={handleChange} />
      {errors.premiumAmount && <span className={styles.error}>{errors.premiumAmount}</span>}
      <label>Payment Frequency</label>
      <select name="paymentFrequency" value={formData.paymentFrequency} onChange={handleChange}>
        <option value="Monthly">Monthly</option>
        <option value="Quarterly">Quarterly</option>
        <option value="Yearly">Yearly</option>
      </select>
      <label>Beneficiary Details</label>
      <input name="beneficiaryDetails" value={formData.beneficiaryDetails} onChange={handleChange} />
      {errors.beneficiaryDetails && <span className={styles.error}>{errors.beneficiaryDetails}</span>}
      <label>Claim Limit</label>
      <input name="claimLimit" value={formData.claimLimit} onChange={handleChange} />
      {errors.claimLimit && <span className={styles.error}>{errors.claimLimit}</span>}
      <label>Policy Type</label>
      <select name="policyType" value={formData.policyType} onChange={handleChange}>
        <option value="Individual">Individual</option>
        <option value="Family">Family</option>
        <option value="Critical Illness">Critical Illness</option>
      </select>
      <label>Terms and Conditions</label>
      <textarea name="termsAndConditions" value={formData.termsAndConditions} onChange={handleChange} />
      {errors.termsAndConditions && <span className={styles.error}>{errors.termsAndConditions}</span>}
      <label>Pre-Existing Diseases</label>
      <input name="preExistingDiseases" value={formData.preExistingDiseases} onChange={handleChange} />
      <button type="submit">Save</button>
      {message && <div className={styles.message}>{message}</div>}
    </form>
  );
};

export default HealthForm;
