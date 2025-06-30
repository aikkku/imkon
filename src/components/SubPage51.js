import React from 'react';
import './SubPage51.css';

const SubPage51 = ({ activeButton }) => {
  return (
    <div className="sub-page-51">
      <div className="sub-page-header">
        <h2>Data Management</h2>
      </div>
      
      <div className="sub-page-content">
        <div className="content-section">
          <h3>Data Operations</h3>
          <p>
            Manage datasets, data pipelines, and data processing workflows 
            with comprehensive data management tools and analytics.
          </p>
        </div>

        <div className="content-section">
          <h3>Data Overview</h3>
          <div className="data-stats">
            <div className="data-card">
              <div className="data-icon">📊</div>
              <div className="data-info">
                <h4>Total Datasets</h4>
                <div className="data-number">1,247</div>
                <p>Active datasets in the system</p>
              </div>
            </div>
            
            <div className="data-card">
              <div className="data-icon">💾</div>
              <div className="data-info">
                <h4>Storage Used</h4>
                <div className="data-number">2.3TB</div>
                <p>Out of 5TB total capacity</p>
              </div>
            </div>
            
            <div className="data-card">
              <div className="data-icon">🔄</div>
              <div className="data-info">
                <h4>Active Pipelines</h4>
                <div className="data-number">18</div>
                <p>Data processing pipelines running</p>
              </div>
            </div>
            
            <div className="data-card">
              <div className="data-icon">📈</div>
              <div className="data-info">
                <h4>Data Quality</h4>
                <div className="data-number">94.2%</div>
                <p>Average data quality score</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Recent Data Activities</h3>
          <div className="data-activities">
            <div className="activity-item">
              <div className="activity-icon">📥</div>
              <div className="activity-content">
                <h4>Data Import Completed</h4>
                <p>Customer analytics dataset imported successfully</p>
                <div className="activity-meta">
                  <span className="activity-time">5 minutes ago</span>
                  <span className="activity-size">2.1GB</span>
                </div>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon">🔧</div>
              <div className="activity-content">
                <h4>Pipeline Updated</h4>
                <p>ETL pipeline for sales data updated with new transformations</p>
                <div className="activity-meta">
                  <span className="activity-time">1 hour ago</span>
                  <span className="activity-status success">Success</span>
                </div>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon">🧹</div>
              <div className="activity-content">
                <h4>Data Cleaning</h4>
                <p>Automated data cleaning process completed for user profiles</p>
                <div className="activity-meta">
                  <span className="activity-time">3 hours ago</span>
                  <span className="activity-records">15,432 records processed</span>
                </div>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon">📤</div>
              <div className="activity-content">
                <h4>Data Export</h4>
                <p>Monthly report data exported to external system</p>
                <div className="activity-meta">
                  <span className="activity-time">6 hours ago</span>
                  <span className="activity-size">850MB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Data Sources</h3>
          <div className="data-sources">
            <div className="source-item">
              <div className="source-icon">🗄️</div>
              <div className="source-info">
                <h4>PostgreSQL Database</h4>
                <p>Primary application database with real-time data</p>
                <span className="source-status connected">Connected</span>
              </div>
            </div>
            
            <div className="source-item">
              <div className="source-icon">❄️</div>
              <div className="source-info">
                <h4>Snowflake Data Warehouse</h4>
                <p>Analytics and reporting data warehouse</p>
                <span className="source-status connected">Connected</span>
              </div>
            </div>
            
            <div className="source-item">
              <div className="source-icon">📁</div>
              <div className="source-info">
                <h4>S3 Storage</h4>
                <p>File storage and backup system</p>
                <span className="source-status connected">Connected</span>
              </div>
            </div>
            
            <div className="source-item">
              <div className="source-icon">🔌</div>
              <div className="source-info">
                <h4>API Endpoints</h4>
                <p>External data sources via REST APIs</p>
                <span className="source-status warning">2 Failed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPage51; 