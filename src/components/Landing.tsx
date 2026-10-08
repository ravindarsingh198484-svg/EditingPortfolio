import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              RAVINDAR
              <br />
              <span>SINGH</span>
            </h1>
            <div className="landing-badge">3+ Years of Experience</div>
            <p className="landing-subtitle">
              Professional Freelance Video Editor crafting high-retention stories.
            </p>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Video Editor</div>
              <div className="landing-h2-2">Storyteller</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Storyteller</div>
              <div className="landing-h2-info-1">Video Editor</div>
            </h2>

            <div className="landing-clients-card">
              <h3>Worked with</h3>
              <p className="client-count">20+ clients</p>
              <div className="client-avatars-stack">
                <div className="avatar-circle">
                  <img src="/images/azad soch.jpg" alt="Client Azad Soch" />
                </div>
                <div className="avatar-circle">
                  <img src="/images/chatgpt purse.png" alt="Client 2" />
                </div>
                <div className="avatar-circle">
                  <img src="/images/ravindarsingh@01.jpg" alt="Ravindar Singh" />
                </div>
                <div className="avatar-circle">
                  <img src="/images/sadavlogs4.jpg" alt="Sada Vlogs" />
                </div>
                <div className="avatar-circle plus-circle">
                  <img src="/images/sandeepclientprofile.jpg" alt="Sandeep" />
                  <span className="plus-overlay">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;