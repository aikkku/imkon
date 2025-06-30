import React from 'react';
import './SubPage34.css';

const SubPage34 = ({ activeButton }) => {
  return (
    <div className="sub-page-34">
      <div className="sub-page-header">
        <h2>Documentation</h2>
      </div>
      
      <div className="sub-page-content">
        <div className="content-section">
          <h3>Project Documentation</h3>
          <p>
            Access comprehensive documentation for all projects, APIs, and technical specifications 
            with searchable content and version control.
          </p>
        </div>

        <div className="content-section">
          <h3>Document Categories</h3>
          <div className="doc-categories">
            <div className="doc-category">
              <div className="category-icon">📚</div>
              <div className="category-info">
                <h4>API Documentation</h4>
                <p>REST APIs, GraphQL schemas, and integration guides</p>
                <span className="doc-count">24 documents</span>
              </div>
            </div>
            
            <div className="doc-category">
              <div className="category-icon">🔧</div>
              <div className="category-info">
                <h4>Technical Guides</h4>
                <p>Setup instructions, configuration, and troubleshooting</p>
                <span className="doc-count">18 documents</span>
              </div>
            </div>
            
            <div className="doc-category">
              <div className="category-icon">📋</div>
              <div className="category-info">
                <h4>User Manuals</h4>
                <p>End-user guides and feature documentation</p>
                <span className="doc-count">12 documents</span>
              </div>
            </div>
            
            <div className="doc-category">
              <div className="category-icon">🏗️</div>
              <div className="category-info">
                <h4>Architecture</h4>
                <p>System design, data models, and infrastructure</p>
                <span className="doc-count">8 documents</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Recent Updates</h3>
          <div className="doc-updates">
            <div className="update-item">
              <div className="update-icon">📝</div>
              <div className="update-content">
                <h4>API v2.1 Release Notes</h4>
                <p>Updated authentication endpoints and new webhook features</p>
                <div className="update-meta">
                  <span className="update-time">2 hours ago</span>
                  <span className="update-author">by John Smith</span>
                </div>
              </div>
            </div>
            
            <div className="update-item">
              <div className="update-icon">🔧</div>
              <div className="update-content">
                <h4>Deployment Guide</h4>
                <p>Added Kubernetes deployment instructions and monitoring setup</p>
                <div className="update-meta">
                  <span className="update-time">1 day ago</span>
                  <span className="update-author">by Sarah Johnson</span>
                </div>
              </div>
            </div>
            
            <div className="update-item">
              <div className="update-icon">📊</div>
              <div className="update-content">
                <h4>Analytics Dashboard</h4>
                <p>Updated user interface documentation with new chart components</p>
                <div className="update-meta">
                  <span className="update-time">3 days ago</span>
                  <span className="update-author">by Mike Chen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPage34; 