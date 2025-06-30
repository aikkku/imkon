import React from 'react';
import './Page4.css';

const Page4 = ({ activeButton }) => {
  return (
    <div className="page4">
      <div className="page4-header">
        <h2>Analytics & Reports</h2>
      </div>
      
      <div className="page4-content">
        <div className="content-section">
          <h3>Performance Analytics</h3>
          <p>
            Comprehensive analytics and reporting tools to monitor your AI operations, 
            track performance metrics, and gain valuable insights into system behavior.
          </p>
        </div>

        <div className="content-section">
          <h3>Usage Statistics</h3>
          <div className="chart-container">
            <div className="chart-placeholder">
              <div className="chart-icon">📊</div>
              <h4>Monthly Usage Trends</h4>
              <p>Interactive chart showing request volume, response times, and error rates</p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Agent Performance</h3>
          <div className="performance-grid">
            <div className="performance-card">
              <div className="performance-header">
                <h4>Agent Alpha</h4>
                <span className="status-badge success">Active</span>
              </div>
              <div className="performance-stats">
                <div className="stat">
                  <span className="stat-label">Requests</span>
                  <span className="stat-value">847</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Success Rate</span>
                  <span className="stat-value">99.2%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Avg Response</span>
                  <span className="stat-value">1.8s</span>
                </div>
              </div>
            </div>
            
            <div className="performance-card">
              <div className="performance-header">
                <h4>Agent Beta</h4>
                <span className="status-badge warning">Maintenance</span>
              </div>
              <div className="performance-stats">
                <div className="stat">
                  <span className="stat-label">Requests</span>
                  <span className="stat-value">623</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Success Rate</span>
                  <span className="stat-value">97.8%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Avg Response</span>
                  <span className="stat-value">2.1s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Recent Reports</h3>
          <div className="reports-list">
            <div className="report-item">
              <div className="report-icon">📄</div>
              <div className="report-content">
                <h4>Weekly Performance Report</h4>
                <p>Comprehensive analysis of system performance and user activity</p>
                <span className="report-date">Generated 2 days ago</span>
              </div>
              <button className="download-btn">Download</button>
            </div>
            
            <div className="report-item">
              <div className="report-icon">📈</div>
              <div className="report-content">
                <h4>Monthly Analytics Summary</h4>
                <p>Detailed insights into usage patterns and optimization opportunities</p>
                <span className="report-date">Generated 1 week ago</span>
              </div>
              <button className="download-btn">Download</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4; 