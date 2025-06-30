import React from 'react';
import './SubPage35.css';

const SubPage35 = ({ activeButton }) => {
  return (
    <div className="sub-page-35">
      <div className="sub-page-header">
        <h2>Settings</h2>
      </div>
      
      <div className="sub-page-content">
        <div className="content-section">
          <h3>System Configuration</h3>
          <p>
            Configure system settings, user preferences, and integration options 
            to customize your IMKON experience.
          </p>
        </div>

        <div className="content-section">
          <h3>User Preferences</h3>
          <div className="settings-grid">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Dark Mode</h4>
                <p>Enable dark theme for better visibility</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Notifications</h4>
                <p>Receive alerts for important updates</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Auto Save</h4>
                <p>Automatically save work every 5 minutes</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Language</h4>
                <p>Select your preferred language</p>
              </div>
              <div className="setting-control">
                <select className="setting-select">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Security Settings</h3>
          <div className="security-settings">
            <div className="security-item">
              <div className="security-icon">🔐</div>
              <div className="security-info">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account</p>
                <span className="security-status enabled">Enabled</span>
              </div>
            </div>
            
            <div className="security-item">
              <div className="security-icon">🔑</div>
              <div className="security-info">
                <h4>Password Policy</h4>
                <p>Configure password requirements and expiration</p>
                <span className="security-status configured">Configured</span>
              </div>
            </div>
            
            <div className="security-item">
              <div className="security-icon">📱</div>
              <div className="security-info">
                <h4>Session Management</h4>
                <p>Manage active sessions and login history</p>
                <span className="security-status active">3 Active Sessions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Integration Settings</h3>
          <div className="integration-list">
            <div className="integration-item">
              <div className="integration-icon">🔗</div>
              <div className="integration-info">
                <h4>GitHub Integration</h4>
                <p>Connect your GitHub repositories for seamless development</p>
              </div>
              <button className="integration-btn connected">Connected</button>
            </div>
            
            <div className="integration-item">
              <div className="integration-icon">☁️</div>
              <div className="integration-info">
                <h4>AWS Cloud</h4>
                <p>Deploy and manage resources on AWS infrastructure</p>
              </div>
              <button className="integration-btn">Connect</button>
            </div>
            
            <div className="integration-item">
              <div className="integration-icon">📊</div>
              <div className="integration-info">
                <h4>Slack Notifications</h4>
                <p>Send alerts and updates to your Slack workspace</p>
              </div>
              <button className="integration-btn">Connect</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPage35; 