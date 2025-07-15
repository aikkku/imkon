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
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <div className="info-content">
                <h4>Centralized Platform</h4>
                <p>One application for 1,000+ colleges and universities</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">⏰</div>
              <div className="info-content">
                <h4>Time Saving</h4>
                <p>Apply to multiple institutions with one application</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">🌍</div>
              <div className="info-content">
                <h4>Global Reach</h4>
                <p>Used by students from Canada, Japan, China, and Europe</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📚</div>
              <div className="info-content">
                <h4>Diverse Institutions</h4>
                <p>250+ public universities and 12 HBCUs included</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>When Does Common App Open?</h3>
          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-marker">📅</div>
              <div className="timeline-content">
                <h4>August 1st</h4>
                <p>Common App officially opens for the new application cycle</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">🔄</div>
              <div className="timeline-content">
                <h4>Mid-August</h4>
                <p>Most colleges update their applications and prompts</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">✅</div>
              <div className="timeline-content">
                <h4>End of August</h4>
                <p>Almost all colleges have updated their applications</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">💡</div>
              <div className="timeline-content">
                <h4>Pro Tip</h4>
                <p>Start working on personal statement and supplements before August</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Application Deadlines</h3>
          <div className="deadline-table">
            <div className="deadline-table-header">
              <div className="deadline-type-column">Application Type</div>
              <div className="deadline-timeline-column">Timeline</div>
            </div>
            
            <div className="deadline-table-row">
              <div className="deadline-type-cell">
                <h4>Early Action (Southern Schools)</h4>
              </div>
              <div className="deadline-timeline-cell">
                <span>October 15</span>
              </div>
            </div>
            
            <div className="deadline-table-row">
              <div className="deadline-type-cell">
                <h4>Early Decision I & Early Action</h4>
              </div>
              <div className="deadline-timeline-cell">
                <span>November 1 - 15</span>
              </div>
            </div>
            
            <div className="deadline-table-row">
              <div className="deadline-type-cell">
                <h4>Regular Decision</h4>
              </div>
              <div className="deadline-timeline-cell">
                <span>January 1 (most common)</span>
                <span className="timeline-note">Some schools: Dec. 1, later Jan., or Feb.</span>
              </div>
            </div>
            
            <div className="deadline-table-row">
              <div className="deadline-type-cell">
                <h4>Early Decision II</h4>
              </div>
              <div className="deadline-timeline-cell">
                <span>January 1 - 15</span>
              </div>
            </div>
            
            <div className="deadline-table-row">
              <div className="deadline-type-cell">
                <h4>Rolling Admissions</h4>
              </div>
              <div className="deadline-timeline-cell">
                <span>August 1 through spring</span>
                <span className="timeline-note">Applications reviewed as they arrive</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Essay Prompts</h3>
          <div className="app-components">
            <div className="component-card">
              <div className="component-icon">📝</div>
              <div className="component-info">
                <h4>Background Essay</h4>
                <p>Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.</p>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">💪</div>
              <div className="component-info">
                <h4>Challenge Essay</h4>
                <p>The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?</p>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🤔</div>
              <div className="component-info">
                <h4>Belief Essay</h4>
                <p>Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?</p>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🙏</div>
              <div className="component-info">
                <h4>Gratitude Essay</h4>
                <p>Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?</p>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🎯</div>
              <div className="component-info">
                <h4>Accomplishment Essay</h4>
                <p>Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.</p>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">💡</div>
              <div className="component-info">
                <h4>Topic Essay</h4>
                <p>Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?</p>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">✨</div>
              <div className="component-info">
                <h4>Create Your Own</h4>
                <p>Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>How to Use the Common App - Step by Step</h3>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Pre-work: Gather Materials</h4>
                <p>High school transcripts, test scores and dates, family/demographic info, preliminary list of extracurricular activities, and any awards or honors</p>
                <span className="step-status required">Required</span>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Add Colleges</h4>
                <p>Use the College Search tab to find and add colleges to your My Colleges list. You can add up to 20 colleges.</p>
                <span className="step-status required">Required</span>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Complete Common App Tab</h4>
                <p>Fill out Profile, Family, Education, Testing, Activities, and Writing sections. This information will be sent to all colleges.</p>
                <span className="step-status required">Required</span>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Write Your Personal Statement</h4>
                <p>Choose from the 7 essay prompts and write your 650-word personal statement. Give yourself at least a month for brainstorming, drafting, and revising.</p>
                <span className="step-status required">Required</span>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Complete Supplemental Essays</h4>
                <p>Use the super essay approach to organize prompts and save time. Each college may have different supplemental essay requirements.</p>
                <span className="step-status varies">Varies</span>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">6</div>
              <div className="step-content">
                <h4>Invite Recommenders</h4>
                <p>Check how many recommendations each school requires. Invite teachers, counselors, and other recommenders through the system.</p>
                <span className="step-status required">Required</span>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">7</div>
              <div className="step-content">
                <h4>Track Requirements</h4>
                <p>Keep track of application requirements for each college. Some may require writing samples, portfolios, or resumes.</p>
                <span className="step-status important">Important</span>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">8</div>
              <div className="step-content">
                <h4>Review and Submit</h4>
                <p>Have someone double-check your work before submitting. Track application status through the Dashboard.</p>
                <span className="step-status final">Final Step</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Application Components</h3>
          <div className="app-components">
            <div className="component-card">
              <div className="component-icon">👤</div>
              <div className="component-info">
                <h4>Personal Information</h4>
                <p>Basic details, family info, and demographic data</p>
                <span className="component-status completed">Required</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🏫</div>
              <div className="component-info">
                <h4>Academic History</h4>
                <p>High school information, courses, and grades</p>
                <span className="component-status completed">Required</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">📝</div>
              <div className="component-info">
                <h4>Personal Statement</h4>
                <p>650-word essay from the 7 available prompts</p>
                <span className="component-status completed">Required</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🎯</div>
              <div className="component-info">
                <h4>Activities & Honors</h4>
                <p>Extracurricular activities, awards, and achievements</p>
                <span className="component-status completed">Required</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">📚</div>
              <div className="component-info">
                <h4>Test Scores</h4>
                <p>SAT, ACT, AP, and other standardized test scores</p>
                <span className="component-status optional">Optional</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">💼</div>
              <div className="component-info">
                <h4>Recommendations</h4>
                <p>Letters from teachers, counselors, and others</p>
                <span className="component-status completed">Required</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">📄</div>
              <div className="component-info">
                <h4>Supplemental Essays</h4>
                <p>Additional essays required by specific colleges</p>
                <span className="component-status varies">Varies</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">📋</div>
              <div className="component-info">
                <h4>Additional Information</h4>
                <p>Optional section for context not covered elsewhere</p>
                <span className="component-status optional">Optional</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section faq-section">
          <h3>FAQ + Common Mistakes</h3>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-icon">❓</div>
              <div className="faq-content">
                <h4>Click "Major" Boxes</h4>
                <p>Some schools have "Why Major" essays that only appear after selecting a particular major or field</p>
              </div>
                </div>
            
            <div className="faq-item">
              <div className="faq-icon">⏰</div>
              <div className="faq-content">
                <h4>Timeline</h4>
                <p>Give yourself at least a month, ideally two or three months, for personal statement and supplemental essays</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className="faq-icon">💰</div>
              <div className="faq-content">
                <h4>Fee Waivers</h4>
                <p>Almost half of all Common App colleges don't charge application fees. You can get free applications</p>
              </div>
                </div>
            
            <div className="faq-item">
              <div className="faq-icon">📝</div>
              <div className="faq-content">
                <h4>Additional Info Section</h4>
                <p>You don't have to put something in the Additional Info section, but it can be useful for important context</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className="faq-icon">🔄</div>
              <div className="faq-content">
                <h4>Alternative Platforms</h4>
                <p>You don't have to use Common App. Schools may accept applications through their own website, Coalition App, or other platforms</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className="faq-icon">🎓</div>
              <div className="faq-content">
                <h4>Transfer Students</h4>
                <p>Transfer essays are different from first-year apps. There are differences in how you approach the "Experiences" section</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section tips-section">
          <h3>Key Tips & Strategies</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">🚀</div>
                <h4>Start Early</h4>
              </div>
              <p>Begin working on your personal statement and supplements before August 1st</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">📝</div>
                <h4>Super Essay Approach</h4>
              </div>
              <p>Combine multiple schools' prompts to save dozens of hours of writing</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">💰</div>
                <h4>Fee Waivers</h4>
              </div>
              <p>Almost half of Common App colleges don't charge application fees</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">🔍</div>
                <h4>Check Requirements</h4>
              </div>
              <p>Each college may have different supplemental essay and recommendation requirements</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">👥</div>
                <h4>Recommendation Process</h4>
              </div>
              <p>One teacher's recommendation can be submitted to multiple schools. Determine which college requires the highest number</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">📊</div>
                <h4>Dashboard Tracking</h4>
              </div>
              <p>Red Dash = not required, Yellow Circle = in progress, Green Check = submitted</p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Common App Requirements</h3>
          <p>
            Most colleges on the Common App will ask for info about your parent or guardian's work history and educational background, 
            your high school transcript, and a list of your extracurricular activities. Most will also require counselor or teacher 
            letters of recommendation. Additionally, many schools will require a personal statement, and possibly supplemental essays. 
            Some schools will require SAT or ACT scores. There are over 1,000 colleges on the Common App, and you can narrow down 
            by factors like region, campus setting, financial aid, enrollment size, minority serving institution, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubPage31; 