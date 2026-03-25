import React from 'react';

const TermsOfUse = () => {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', background: '#ffffff', borderRadius: 16, border: '1px solid rgba(124, 58, 237, 0.12)', boxShadow: '0 4px 24px rgba(91, 33, 182, 0.08)', padding: '36px 32px', fontFamily: 'inherit' }}>
      <h1 style={{ fontSize: 32, color: '#5b21b6', marginBottom: 16 }}>Terms of Use</h1>
      <p style={{ color: '#333', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
        Welcome to IMKON! Please read these terms and conditions carefully before using our website and services.
      </p>
      <ul style={{ color: '#444', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
        <li>You must be at least 13 years old to use this service.</li>
        <li>Your use of IMKON is at your own risk. We do not guarantee admission to any university.</li>
        <li>Do not share your password or sensitive information with others.</li>
        <li>We may update these terms at any time. Continued use means you accept the new terms.</li>
        <li>All content and AI responses are for informational purposes only.</li>
      </ul>
      <p style={{ color: '#555', fontSize: 15, marginBottom: 32 }}>
        By using IMKON, you agree to abide by these terms. If you do not agree, please do not use our service.
      </p>
      <button
        onClick={() => window.history.back()}
        style={{
          background: 'linear-gradient(90deg, #7c3aed 0%, #5b21b6 100%)',
          color: '#ffffff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 28px',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(124, 58, 237, 0.2)',
        }}
      >
        Back
      </button>
    </div>
  );
};

export default TermsOfUse; 