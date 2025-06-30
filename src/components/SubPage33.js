import React from 'react';
import './SubPage33.css';

const SubPage33 = ({ activeButton }) => {
  return (
    <div className="sub-page-33">
      <div className="sub-page-header">
        <h2>Resource Management</h2>
      </div>
      
      <div className="sub-page-content">
        <div className="content-section">
          <h3>Resource Allocation</h3>
          <p>
            Optimize resource allocation and track utilization across projects 
            with comprehensive resource management tools and real-time monitoring.
          </p>
        </div>

        <div className="content-section">
          <h3>Resource Overview</h3>
          <div className="resource-stats">
            <div className="resource-card">
              <div className="resource-icon">💻</div>
              <div className="resource-info">
                <h4>Computing Resources</h4>
                <div className="resource-usage">
                  <div className="usage-bar">
                    <div className="usage-fill" style={{ width: '75%' }}></div>
                  </div>
                  <span className="usage-text">75% Used</span>
                </div>
                <p>8/12 GPUs Active</p>
              </div>
            </div>
            
            <div className="resource-card">
              <div className="resource-icon">💾</div>
              <div className="resource-info">
                <h4>Storage</h4>
                <div className="resource-usage">
                  <div className="usage-bar">
                    <div className="usage-fill storage" style={{ width: '45%' }}></div>
                  </div>
                  <span className="usage-text">45% Used</span>
                </div>
                <p>2.3TB / 5TB Available</p>
              </div>
            </div>
            
            <div className="resource-card">
              <div className="resource-icon">🌐</div>
              <div className="resource-info">
                <h4>Network</h4>
                <div className="resource-usage">
                  <div className="usage-bar">
                    <div className="usage-fill network" style={{ width: '30%' }}></div>
                  </div>
                  <span className="usage-text">30% Used</span>
                </div>
                <p>300Mbps / 1Gbps</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Active Projects</h3>
          <div className="project-resources">
            <div className="project-resource">
              <div className="project-header">
                <h4>AI Chatbot Integration</h4>
                <span className="resource-priority high">High Priority</span>
              </div>
              <div className="resource-breakdown">
                <div className="resource-item">
                  <span>GPU: 2 units</span>
                  <span>Memory: 16GB</span>
                </div>
                <div className="resource-item">
                  <span>Storage: 500GB</span>
                  <span>Network: 100Mbps</span>
                </div>
              </div>
            </div>
            
            <div className="project-resource">
              <div className="project-header">
                <h4>Data Analytics Dashboard</h4>
                <span className="resource-priority medium">Medium Priority</span>
              </div>
              <div className="resource-breakdown">
                <div className="resource-item">
                  <span>GPU: 1 unit</span>
                  <span>Memory: 8GB</span>
                </div>
                <div className="resource-item">
                  <span>Storage: 200GB</span>
                  <span>Network: 50Mbps</span>
                </div>
              </div>
            </div>
            
            <div className="project-resource">
              <div className="project-header">
                <h4>Machine Learning Pipeline</h4>
                <span className="resource-priority low">Low Priority</span>
              </div>
              <div className="resource-breakdown">
                <div className="resource-item">
                  <span>GPU: 3 units</span>
                  <span>Memory: 24GB</span>
                </div>
                <div className="resource-item">
                  <span>Storage: 1TB</span>
                  <span>Network: 200Mbps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPage33; 