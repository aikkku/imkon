import React from 'react';
import './SubPage31.css';

const SubPage31 = ({ activeButton }) => {
  return (
    <div className="sub-page-31">
      <div className="sub-page-header">
        <h2>Common Application</h2>
        <p>Your gateway to 1,000+ US universities</p>
      </div>
      
      <div className="sub-page-content">
        <div className="content-section">
          <h3>About Common App</h3>
          <p>
            The Common Application is a centralized college application platform used by over 1,000 colleges and universities 
            in the United States. It allows you to apply to multiple institutions with one application, saving time and effort.
          </p>
        </div>

        <div className="content-section">
          <h3>Application Components</h3>
          <div className="app-components">
            <div className="component-card">
              <div className="component-icon">👤</div>
              <div className="component-info">
                <h4>Personal Information</h4>
                <p>Basic details, contact information, and demographic data</p>
                <span className="component-status completed">Completed</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🏫</div>
              <div className="component-info">
                <h4>Academic History</h4>
                <p>High school information, courses, and grades</p>
                <span className="component-status in-progress">In Progress</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">📝</div>
              <div className="component-info">
                <h4>Personal Statement</h4>
                <p>650-word essay about your background and goals</p>
                <span className="component-status completed">Completed</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🎯</div>
              <div className="component-info">
                <h4>Activities & Honors</h4>
                <p>Extracurricular activities, awards, and achievements</p>
                <span className="component-status pending">Pending</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">📚</div>
              <div className="component-info">
                <h4>Test Scores</h4>
                <p>SAT, ACT, AP, and other standardized test scores</p>
                <span className="component-status completed">Completed</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">💼</div>
              <div className="component-info">
                <h4>Recommendations</h4>
                <p>Letters of recommendation from teachers and counselors</p>
                <span className="component-status in-progress">In Progress</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Target Universities</h3>
          <div className="universities-list">
            <div className="university-item">
              <div className="university-icon">🎓</div>
              <div className="university-info">
                <h4>Harvard University</h4>
                <p>Early Decision • Deadline: Nov 1</p>
                <div className="university-meta">
                  <span className="university-status submitted">Submitted</span>
                  <span className="university-fee">$75</span>
                </div>
              </div>
            </div>
            
            <div className="university-item">
              <div className="university-icon">🎓</div>
              <div className="university-info">
                <h4>Stanford University</h4>
                <p>Regular Decision • Deadline: Jan 3</p>
                <div className="university-meta">
                  <span className="university-status in-progress">In Progress</span>
                  <span className="university-fee">$90</span>
                </div>
              </div>
            </div>
            
            <div className="university-item">
              <div className="university-icon">🎓</div>
              <div className="university-info">
                <h4>MIT</h4>
                <p>Early Action • Deadline: Nov 1</p>
                <div className="university-meta">
                  <span className="university-status pending">Pending</span>
                  <span className="university-fee">$75</span>
                </div>
              </div>
            </div>
            
            <div className="university-item">
              <div className="university-icon">🎓</div>
              <div className="university-info">
                <h4>Yale University</h4>
                <p>Regular Decision • Deadline: Jan 2</p>
                <div className="university-meta">
                  <span className="university-status not-started">Not Started</span>
                  <span className="university-fee">$80</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Important Deadlines</h3>
          <div className="deadlines-list">
            <div className="deadline-item">
              <div className="deadline-date">
                <span className="deadline-day">01</span>
                <span className="deadline-month">NOV</span>
              </div>
              <div className="deadline-info">
                <h4>Early Decision/Early Action</h4>
                <p>Harvard, MIT, Stanford Early Action</p>
              </div>
              <span className="deadline-status urgent">5 days left</span>
            </div>
            
            <div className="deadline-item">
              <div className="deadline-date">
                <span className="deadline-day">15</span>
                <span className="deadline-month">NOV</span>
              </div>
              <div className="deadline-info">
                <h4>University of California</h4>
                <p>UC Application deadline</p>
              </div>
              <span className="deadline-status warning">19 days left</span>
            </div>
            
            <div className="deadline-item">
              <div className="deadline-date">
                <span className="deadline-day">01</span>
                <span className="deadline-month">JAN</span>
              </div>
              <div className="deadline-info">
                <h4>Regular Decision</h4>
                <p>Most universities regular deadline</p>
              </div>
              <span className="deadline-status normal">65 days left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPage31; 