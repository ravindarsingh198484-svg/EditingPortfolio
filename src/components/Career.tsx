import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Started Video Editing Journey</h4>
                <h5>Self-Taught & Passion Projects</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Began learning professional editing workflows, mastering cut techniques,
              story structuring, and understanding viewer pacing and retention.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Expanded Editing Expertise</h4>
                <h5>Content Creator Partnerships</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Scaled client output across YouTube and social media platforms, fine-tuning
              motion graphics, audio mastering, and color grading for viral engagement.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Video Editor & Creator Partner</h4>
                <h5>20+ Global Clients</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Working actively as a freelance video editor partnering with over 20+ diverse
              creators and brands, delivering high-retention cinematic edits and viral reels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;