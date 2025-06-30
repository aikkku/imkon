import React from 'react';
import './SubPage32.css';

const SubPage32 = ({ activeButton }) => {
  return (
    <div className="sub-page-32">
      <div className="sub-page-header">
        <h2>Team Collaboration</h2>
      </div>
      
      <div className="sub-page-content">
        <div className="content-section">
          <h3>Team Management</h3>
          <p>
            Manage your development team, assign tasks, and track collaboration progress 
            with comprehensive team management tools and real-time communication features.
          </p>
        </div>

        <div className="content-section">
          <h3>Team Members</h3>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <div className="member-info">
                <h4>John Smith</h4>
                <p>Lead Developer</p>
                <span className="member-status online">Online</span>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <div className="member-info">
                <h4>Sarah Johnson</h4>
                <p>Project Manager</p>
                <span className="member-status online">Online</span>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">👨‍🔬</div>
              <div className="member-info">
                <h4>Mike Chen</h4>
                <p>Data Scientist</p>
                <span className="member-status away">Away</span>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">👩‍🎨</div>
              <div className="member-info">
                <h4>Emma Davis</h4>
                <p>UI/UX Designer</p>
                <span className="member-status offline">Offline</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Recent Activities</h3>
          <div className="activities-list">
            <div className="activity-item">
              <div className="activity-icon">💬</div>
              <div className="activity-content">
                <h4>Team Meeting</h4>
                <p>Weekly standup meeting completed</p>
                <span className="activity-time">30 minutes ago</span>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <h4>Task Assigned</h4>
                <p>API documentation task assigned to John</p>
                <span className="activity-time">1 hour ago</span>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon">✅</div>
              <div className="activity-content">
                <h4>Code Review</h4>
                <p>Sarah completed code review for feature branch</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPage32; 