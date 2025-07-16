import React from 'react';
import './SubPage71.css';

const SubPage71 = ({ activeButton }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  if (isMobile) {
    return (
      <>
        <div className="sub-page-header">
          <h2>Personal Statement</h2>
        </div>
        <div className="sub-page-content">
          {/* All content-section blocks go here, copy from inside .sub-page-content */}
          <div className="content-section">
            <h3>Writing Your Personal Statement</h3>
            <p>The personal statement is your opportunity to tell your unique story and convince admissions officers why you deserve a place at their university.</p>
            <div className="statement-overview">
              <div className="overview-card">
                <div className="overview-icon">📝</div>
                <div className="overview-content">
                  <h4>Purpose</h4>
                  <p>Show your personality, motivation, and fit for the program</p>
                </div>
              </div>
              
              <div className="overview-card">
                <div className="overview-icon">📏</div>
                <div className="overview-content">
                  <h4>Length</h4>
                  <p>Typically 500-650 words for Common App, varies by university</p>
                </div>
              </div>
              
              <div className="overview-card">
                <div className="overview-icon">⏰</div>
                <div className="overview-content">
                  <h4>Timeline</h4>
                  <p>Start drafting 3-4 months before deadlines</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h3>Key Components</h3>
            <div className="components-list">
              <div className="component-item">
                <div className="component-icon">🎯</div>
                <div className="component-content">
                  <h4>Strong Opening</h4>
                  <p>Hook the reader with an engaging first sentence that reflects your personality</p>
                </div>
              </div>
              
              <div className="component-item">
                <div className="component-icon">📚</div>
                <div className="component-content">
                  <h4>Academic Interests</h4>
                  <p>Explain what you want to study and why you're passionate about it</p>
                </div>
              </div>
              
              <div className="component-item">
                <div className="component-icon">🌟</div>
                <div className="component-content">
                  <h4>Personal Growth</h4>
                  <p>Share experiences that shaped your character and goals</p>
                </div>
              </div>
              
              <div className="component-item">
                <div className="component-icon">🎓</div>
                <div className="component-content">
                  <h4>Future Goals</h4>
                  <p>Connect your past experiences to your future aspirations</p>
                </div>
              </div>
              
              <div className="component-item">
                <div className="component-icon">💪</div>
                <div className="component-content">
                  <h4>Overcoming Challenges</h4>
                  <p>Show resilience and how you've grown from difficulties</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h3>Writing Tips</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-header">
                  <div className="tip-icon">✍️</div>
                  <h4>Be Authentic</h4>
                </div>
                <p>Write in your own voice and share genuine experiences that matter to you</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-header">
                  <div className="tip-icon">📖</div>
                  <h4>Show, Don't Tell</h4>
                </div>
                <p>Use specific examples and vivid details instead of general statements</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-header">
                  <div className="tip-icon">🎭</div>
                  <h4>Tell a Story</h4>
                </div>
                <p>Structure your essay as a narrative with a clear beginning, middle, and end</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-header">
                  <div className="tip-icon">🔍</div>
                  <h4>Be Specific</h4>
                </div>
                <p>Include concrete details about activities, achievements, and experiences</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-header">
                  <div className="tip-icon">📝</div>
                  <h4>Edit Ruthlessly</h4>
                </div>
                <p>Cut unnecessary words and ensure every sentence serves a purpose</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-header">
                  <div className="tip-icon">👥</div>
                  <h4>Get Feedback</h4>
                </div>
                <p>Share drafts with teachers, mentors, or peers for constructive criticism</p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h3>Common Mistakes to Avoid</h3>
            <div className="mistakes-list">
              <div className="mistake-item">
                <div className="mistake-icon">❌</div>
                <div className="mistake-content">
                  <h4>Generic Statements</h4>
                  <p>Avoid clichés like "I've always wanted to help people" without specific examples</p>
                </div>
              </div>
              
              <div className="mistake-item">
                <div className="mistake-icon">❌</div>
                <div className="mistake-content">
                  <h4>Listing Achievements</h4>
                  <p>Don't just list activities - explain their significance and impact on you</p>
                </div>
              </div>
              
              <div className="mistake-item">
                <div className="mistake-icon">❌</div>
                <div className="mistake-content">
                  <h4>Being Too Formal</h4>
                  <p>Write naturally as you speak, avoiding overly academic language</p>
                </div>
              </div>
              
              <div className="mistake-item">
                <div className="mistake-icon">❌</div>
                <div className="mistake-content">
                  <h4>Ignoring the Prompt</h4>
                  <p>Make sure your essay directly addresses the specific question asked</p>
                </div>
              </div>
              
              <div className="mistake-item">
                <div className="mistake-icon">❌</div>
                <div className="mistake-content">
                  <h4>Rushing the Process</h4>
                  <p>Give yourself plenty of time to write, revise, and polish your essay</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h3>Essay Structure</h3>
            <div className="structure-timeline">
              <div className="timeline-item">
                <div className="timeline-number">1</div>
                <div className="timeline-content">
                  <h4>Introduction (10-15%)</h4>
                  <p>Hook the reader and introduce your main theme or story</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-number">2</div>
                <div className="timeline-content">
                  <h4>Body Paragraphs (70-80%)</h4>
                  <p>Develop your story with specific examples and reflection</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-number">3</div>
                <div className="timeline-content">
                  <h4>Conclusion (10-15%)</h4>
                  <p>Tie everything together and look toward the future</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="sub-page-71">
      <div className="sub-page-header">
        <h2>Personal Statement</h2>
      </div>
      <div className="sub-page-content">
        <div className="content-section">
          <h3>Writing Your Personal Statement</h3>
          <p>The personal statement is your opportunity to tell your unique story and convince admissions officers why you deserve a place at their university.</p>
          
          <div className="statement-overview">
            <div className="overview-card">
              <div className="overview-icon">📝</div>
              <div className="overview-content">
                <h4>Purpose</h4>
                <p>Show your personality, motivation, and fit for the program</p>
              </div>
            </div>
            
            <div className="overview-card">
              <div className="overview-icon">📏</div>
              <div className="overview-content">
                <h4>Length</h4>
                <p>Typically 500-650 words for Common App, varies by university</p>
              </div>
            </div>
            
            <div className="overview-card">
              <div className="overview-icon">⏰</div>
              <div className="overview-content">
                <h4>Timeline</h4>
                <p>Start drafting 3-4 months before deadlines</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Key Components</h3>
          <div className="components-list">
            <div className="component-item">
              <div className="component-icon">🎯</div>
              <div className="component-content">
                <h4>Strong Opening</h4>
                <p>Hook the reader with an engaging first sentence that reflects your personality</p>
              </div>
            </div>
            
            <div className="component-item">
              <div className="component-icon">📚</div>
              <div className="component-content">
                <h4>Academic Interests</h4>
                <p>Explain what you want to study and why you're passionate about it</p>
              </div>
            </div>
            
            <div className="component-item">
              <div className="component-icon">🌟</div>
              <div className="component-content">
                <h4>Personal Growth</h4>
                <p>Share experiences that shaped your character and goals</p>
              </div>
            </div>
            
            <div className="component-item">
              <div className="component-icon">🎓</div>
              <div className="component-content">
                <h4>Future Goals</h4>
                <p>Connect your past experiences to your future aspirations</p>
              </div>
            </div>
            
            <div className="component-item">
              <div className="component-icon">💪</div>
              <div className="component-content">
                <h4>Overcoming Challenges</h4>
                <p>Show resilience and how you've grown from difficulties</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Writing Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">✍️</div>
                <h4>Be Authentic</h4>
              </div>
              <p>Write in your own voice and share genuine experiences that matter to you</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">📖</div>
                <h4>Show, Don't Tell</h4>
              </div>
              <p>Use specific examples and vivid details instead of general statements</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">🎭</div>
                <h4>Tell a Story</h4>
              </div>
              <p>Structure your essay as a narrative with a clear beginning, middle, and end</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">🔍</div>
                <h4>Be Specific</h4>
              </div>
              <p>Include concrete details about activities, achievements, and experiences</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">📝</div>
                <h4>Edit Ruthlessly</h4>
              </div>
              <p>Cut unnecessary words and ensure every sentence serves a purpose</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">👥</div>
                <h4>Get Feedback</h4>
              </div>
              <p>Share drafts with teachers, mentors, or peers for constructive criticism</p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Common Mistakes to Avoid</h3>
          <div className="mistakes-list">
            <div className="mistake-item">
              <div className="mistake-icon">❌</div>
              <div className="mistake-content">
                <h4>Generic Statements</h4>
                <p>Avoid clichés like "I've always wanted to help people" without specific examples</p>
              </div>
            </div>
            
            <div className="mistake-item">
              <div className="mistake-icon">❌</div>
              <div className="mistake-content">
                <h4>Listing Achievements</h4>
                <p>Don't just list activities - explain their significance and impact on you</p>
              </div>
            </div>
            
            <div className="mistake-item">
              <div className="mistake-icon">❌</div>
              <div className="mistake-content">
                <h4>Being Too Formal</h4>
                <p>Write naturally as you speak, avoiding overly academic language</p>
              </div>
            </div>
            
            <div className="mistake-item">
              <div className="mistake-icon">❌</div>
              <div className="mistake-content">
                <h4>Ignoring the Prompt</h4>
                <p>Make sure your essay directly addresses the specific question asked</p>
              </div>
            </div>
            
            <div className="mistake-item">
              <div className="mistake-icon">❌</div>
              <div className="mistake-content">
                <h4>Rushing the Process</h4>
                <p>Give yourself plenty of time to write, revise, and polish your essay</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Essay Structure</h3>
          <div className="structure-timeline">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <h4>Introduction (10-15%)</h4>
                <p>Hook the reader and introduce your main theme or story</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <h4>Body Paragraphs (70-80%)</h4>
                <p>Develop your story with specific examples and reflection</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <h4>Conclusion (10-15%)</h4>
                <p>Tie everything together and look toward the future</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPage71; 