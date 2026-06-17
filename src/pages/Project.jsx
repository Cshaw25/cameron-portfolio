import React, { useEffect, useRef, useState } from 'react';
import '../styles/Project.css';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// project data
const projects = [
  {
    title: "TrueBets",
    image: `${import.meta.env.BASE_URL}TrueBets.png`,
    date: "2025",
    live: "https://truthnbets.com",
    desc: [
      "ML-powered NBA game prediction platform delivering win/loss probabilities",
      "Trained XGBoost model on 12,000+ historical games achieving 70% accuracy",
      "Built responsive animated React UI with live game cards and probability visualizations",
      "Designed REST API using FastAPI connecting React frontend to Python backend",
      "Deployed on AWS EC2, Amplify, and RDS"
    ],
    tools: ["Python", "React", "XGBoost", "FastAPI", "MySQL", "AWS EC2", "AWS Amplify", "AWS RDS"]
  },
  {
    title: "Dashey",
    image: null,
    date: "In Progress",
    live: null,
    desc: [
      "Full stack student marketplace platform (think Fiverr) for college campuses",
      "Students post side hustle services like tutoring, braiding, homework help, etc...",
      "Built for scale, clean UI specifically tailored for college entrepreneurs.",
    ],
    tools: ["React", "Java", "SpringBoot", "MySQL", "AWS Services"]
  },
  {
    title: "TSU TIPS",
    image: `${import.meta.env.BASE_URL}TSU-TIPS.png`,
    date: "2024",
    live: "https://cshaw25.github.io/TSU-TIPS-GDG-/frontend/templates/login.html",
    desc: [
      "Full stack web app allowing upperclassmen to share campus guidance with new students",
      "Built responsive mobile-optimized interfaces with custom CSS animations",
      "Designed REST API layer for data handling",
      "Designed and managed MySQL relational database schema"
    ],
    tools: ["JavaScript", "HTML/CSS", "MySQL"]
  },
  {
    title: "JPMorgan Simulation",
    image: null,
    date: "2025",
    live: null,
    desc: [
      "Completed 10-hour simulation building a production-style financial transaction system",
      "Implemented Kafka consumer to asynchronously receive and deserialize JSON transactions",
      "Integrated external incentive REST API via HTTP POST to calculate per-transaction bonuses",
    ],
    tools: ["Java", "Spring Boot", "Kafka"]
  },
];

function Project() {
  const [visible, setVisible] = useState([]); // tracks which cards are visible
  const refs = useRef([]);

  // fade in each card as it enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            // add to visible list if not already there
            setVisible((prev) => (prev.includes(index) ? prev : [...prev, index]));
            observer.unobserve(entry.target); // stop watching once visible
          }
        });
      },
      { threshold: 0.15 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className='project-section'>
      <h1 className='project-header'>Projects</h1>
      <div className='project-header-lines'>
        <div className='project-line-1'/>
        <div className='project-line-2'/>
        <div className='project-line-3'/>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          // card gets is-visible class once it enters viewport
          <div
            className={`project-card ${visible.includes(index) ? 'is-visible' : ''}`}
            key={index}
            ref={(el) => (refs.current[index] = el)}
            data-index={index}
          >
            {/* only render image if project has one */}
            {project.image && (
              <img src={project.image} alt={project.title} className="project-card-img"/>
            )}

            <div className="project-card-body">
              <div className="project-card-header">
                <h2 className="project-card-title">{project.title}</h2>
                <span className="project-card-date">{project.date}</span>
              </div>

              {/* bullet points */}
              <ul className="project-card-desc">
                {project.desc.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              {/* tool tags */}
              <div className="project-card-tools">
                {project.tools.map((tool, i) => (
                  <span className="project-tool-tag" key={i}>{tool}</span>
                ))}
              </div>

              {/* only show live link if project is online */}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="project-card-link">
                  View Live  <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs"/>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;