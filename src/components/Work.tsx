import { useState } from "react";
import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Project {
  id: string;
  number: string;
  title: string;
  category: "reel" | "long" | "shorts";
  categoryLabel: string;
  ratio: "16:9" | "9:16";
  description: string;
  tools: string;
  videoUrl: string;
  poster?: string;
}

const allProjects: Project[] = [
  // 1. Only First Showcase Reel (16:9)
  {
    id: "reel-1",
    number: "01",
    title: "SaaS Animation",
    category: "reel",
    categoryLabel: "Showcase Reel (16:9)",
    ratio: "16:9",
    description: "High-impact SaaS product walkthrough and motion graphics, featuring intuitive UI interaction flows, sleek 3D camera sweeps, and custom sound design built to drive software conversions.",
    tools: "After Effects, Premiere Pro, Figma, 3D Motion",
    videoUrl: "https://res.cloudinary.com/fa3vy9zq/video/upload/v1791436858/first_show_reel_portfolio.mp4",
    poster: "/images/showcase-reel-poster.jpg",
  },

  // 2. Long Videos (16:9)
  {
    id: "long-1",
    number: "01",
    title: "A Short Intro",
    category: "long",
    categoryLabel: "Long-Form (16:9)",
    ratio: "16:9",
    description: "High-retention channel intro engineered to hook viewers in the first 3 seconds with kinetic typography, atmospheric soundscapes, and rapid visual branding.",
    tools: "Premiere Pro, DaVinci Resolve, Sound Design",
    videoUrl: "https://res.cloudinary.com/fa3vy9zq/video/upload/v1791439233/long-video-1.mp4",
    poster: "/images/long-video-1-poster.jpg",
  },
  {
    id: "long-2",
    number: "02",
    title: "A Client Project",
    category: "long",
    categoryLabel: "Long-Form (16:9)",
    ratio: "16:9",
    description: "End-to-end commercial client production with multi-camera documentary pacing, polished narrative story arcs, color grading, and broadcast-quality audio mastering.",
    tools: "Premiere Pro, Audition, DaVinci Resolve",
    videoUrl: "https://res.cloudinary.com/fa3vy9zq/video/upload/v1791436949/long-video-2.mp4",
    poster: "/images/long-video-2-poster.jpg",
  },
  {
    id: "long-3",
    number: "03",
    title: "Lifestyle Vlog",
    category: "long",
    categoryLabel: "Long-Form (16:9)",
    ratio: "16:9",
    description: "Cinematic lifestyle travel vlog edit incorporating seamless speed ramps, stylized color grading, immersive environmental sound effects, and emotional narrative flow.",
    tools: "DaVinci Resolve, Premiere Pro, After Effects",
    videoUrl: "https://res.cloudinary.com/fa3vy9zq/video/upload/v1791439714/long-video-3_2__1.mp4",
    poster: "/images/long-video-3-poster.jpg",
  },

  // 3. Shorts (9:16)
  {
    id: "short-1",
    number: "01",
    title: "Finance & Infographics",
    category: "shorts",
    categoryLabel: "Short-Form (9:16)",
    ratio: "9:16",
    description: "Dynamic vertical motion graphics showcase utilizing rhythmic keyframe animations, sleek icon morphs, and fast-paced visual storytelling designed for viral reach.",
    tools: "After Effects, Illustrator, Premiere Pro",
    videoUrl: "https://res.cloudinary.com/fa3vy9zq/video/upload/v1791437319/Shorts-1.mp4",
    poster: "/images/Shorts-1-poster.jpg",
  },
  {
    id: "short-2",
    number: "02",
    title: "Real Estate Project Reel",
    category: "shorts",
    categoryLabel: "Short-Form (9:16)",
    ratio: "9:16",
    description: "Architectural luxury real estate showcase highlighting modern interior aesthetics, smooth gimbal speed transitions, and sophisticated ambient audio design.",
    tools: "Premiere Pro, DaVinci Resolve, Motion Graphics",
    videoUrl: "https://res.cloudinary.com/fa3vy9zq/video/upload/v1791437373/Shorts-2.mp4",
    poster: "/images/Shorts-2-poster.jpg",
  },
  {
    id: "short-3",
    number: "03",
    title: "MrBeast Before After",
    category: "shorts",
    categoryLabel: "Short-Form (9:16)",
    ratio: "9:16",
    description: "Behind-the-scenes editing breakdown showing raw footage transformed into high-octane viral content using zoom cuts, dynamic subtitles, and punchy SFX impacts.",
    tools: "Premiere Pro, CapCut Pro, Sound Design",
    videoUrl: "https://res.cloudinary.com/fa3vy9zq/video/upload/v1791437384/Shorts-3.mp4",
    poster: "/images/Shorts-3-poster.jpg",
  },
  {
    id: "short-4",
    number: "04",
    title: "Coconut",
    category: "shorts",
    categoryLabel: "Short-Form (9:16)",
    ratio: "9:16",
    description: "Punchy tropical viral challenge reel featuring dynamic sound effects, crisp tactile cutaways, vibrant summer color grading, and retention-focused pacing.",
    tools: "Premiere Pro, After Effects, Sound Design",
    videoUrl: "https://res.cloudinary.com/fa3vy9zq/video/upload/v1791437434/Shorts-4.mp4",
    poster: "/images/Shorts-4-poster.jpg",
  },
  {
    id: "short-5",
    number: "05",
    title: "Trading Dialogue",
    category: "shorts",
    categoryLabel: "Short-Form (9:16)",
    ratio: "9:16",
    description: "High-energy financial and trading dialogue short with synced animated kinetic captions, dramatic sound swells, and engaging visual b-roll overlays.",
    tools: "Premiere Pro, After Effects, Audition",
    videoUrl: "https://res.cloudinary.com/fa3vy9zq/video/upload/v1791437590/Shorts-5.mov",
    poster: "/images/Shorts-5-poster.jpg",
  },
];

const Work = () => {
  const [activeTab, setActiveTab] = useState<"reel" | "long" | "shorts">("reel");

  const filteredProjects = allProjects.filter((p) => p.category === activeTab);

  useGSAP(
    () => {
      // Clear any prior horizontal scroll translation when changing category
      gsap.set(".work-flex", { clearProps: "transform" });

      let translateX: number = 0;

      function setTranslateX() {
        const boxes = document.getElementsByClassName("work-box");
        if (!boxes || boxes.length === 0) return;
        const container = document.querySelector(".work-container");
        if (!container) return;
        const rectLeft = container.getBoundingClientRect().left;
        const parent = boxes[0].parentElement;
        const parentWidth = parent ? parent.getBoundingClientRect().width : window.innerWidth;
        const padding: number =
          parseInt(window.getComputedStyle(boxes[0]).padding) / 2 || 0;

        let totalWidth = 0;
        for (let i = 0; i < boxes.length; i++) {
          totalWidth += boxes[i].getBoundingClientRect().width;
        }

        translateX = totalWidth - (rectLeft + parentWidth) + padding;
        if (translateX < 0) translateX = 0;
      }

      setTranslateX();

      if (translateX > 0) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".work-section",
            start: "top top",
            end: `+=${translateX}`,
            scrub: true,
            pin: true,
            id: "work",
            invalidateOnRefresh: true,
          },
        });

        timeline.to(".work-flex", {
          x: -translateX,
          ease: "none",
        });

        return () => {
          timeline.kill();
          ScrollTrigger.getById("work")?.kill();
        };
      } else {
        ScrollTrigger.getById("work")?.kill();
      }
    },
    { dependencies: [activeTab] }
  );

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header-wrap">
          <div>
            <h2>
              My <span>Work</span>
            </h2>
            <p className="work-header-sub">Selected projects curated by format and ratio</p>
          </div>

          {/* Three Categories */}
          <div className="work-category-tabs">
            <button
              className={activeTab === "reel" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("reel")}
            >
              1. Showcase Reel (16:9)
            </button>
            <button
              className={activeTab === "long" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("long")}
            >
              2. Long Videos (16:9)
            </button>
            <button
              className={activeTab === "shorts" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("shorts")}
            >
              3. Shorts (9:16)
            </button>
          </div>
        </div>

        <div className={`work-flex ${filteredProjects.length === 1 ? "single-item" : ""}`}>
          {filteredProjects.map((project) => (
            <div
              className={`work-box ${
                project.category === "reel"
                  ? "box-showreel"
                  : project.ratio === "9:16"
                  ? "box-shorts"
                  : "box-landscape"
              }`}
              key={project.id}
            >
              {project.category === "reel" ? (
                // Dedicated cinematic showcase view
                <>
                  <div className="work-info">
                    <div className="work-info-meta">
                      <div className="work-title">
                        <h3>{project.number}</h3>
                        <div>
                          <h4>{project.title}</h4>
                          <span className="showreel-badge-pill">
                            ★ Featured Showreel • 16:9 • 1080p
                          </span>
                        </div>
                      </div>
                      <p className="work-project-desc">{project.description}</p>
                    </div>
                  </div>

                  <div className="work-video-wrapper wrapper-showreel">
                    <video
                      controls
                      playsInline
                      preload="auto"
                      poster={project.poster}
                      key={project.videoUrl}
                      className="work-video-player video-showreel"
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </>
              ) : (
                // Standard cards for long-form and shorts
                <>
                  <div className="work-info">
                    <div className="work-title">
                      <h3>{project.number}</h3>
                      <div>
                        <h4>{project.title}</h4>
                        <p className="ratio-tag-badge">{project.ratio}</p>
                      </div>
                    </div>
                    <p className="work-project-desc">{project.description}</p>
                  </div>

                  <div
                    className={`work-video-wrapper ${
                      project.ratio === "9:16" ? "wrapper-9-16" : "wrapper-16-9"
                    }`}
                  >
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={project.poster}
                      key={project.videoUrl}
                      className={`work-video-player ${
                        project.ratio === "9:16" ? "video-9-16" : "video-16-9"
                      }`}
                    >
                      {project.videoUrl.endsWith(".mov") ? (
                        <>
                          <source
                            src={project.videoUrl.replace(/\.mov$/i, ".mp4")}
                            type="video/mp4"
                          />
                          <source src={project.videoUrl} type="video/quicktime" />
                        </>
                      ) : (
                        <source src={project.videoUrl} type="video/mp4" />
                      )}
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;