import React, { useEffect, useRef, useState } from 'react';
import '../styles/Project.css';

const projects = [
  {
    title: "TrueBets",
    image: "/TrueBets.png",
    date: "2025",
    live: "https://truthnbets.com",
    desc: [
      "ML-powered NBA game prediction platform delivering win/loss probabilities",
      "Trained XGBoost model on 12,000+ historical games achieving 70% accuracy",
      "Built responsive animated React UI with real-time game cards and probability visualizations",
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
      "Full stack student marketplace platform — think Fiverr for college campuses",
      "Students post side hustle services like tutoring, braiding, and homework help",
      "Built for scale with a focus on clean UI and seamless booking experience",
    ],
    tools: ["React", "Java","SpringBoot", "MySQL","AWS Services"]
  },
  {
    title: "TSU TIPS",
    image: "/TSU-TIPS.png",
    date: "2024",
    live: "https://cshaw25.github.io/TSU-TIPS-GDG-/frontend/templates/login.html",
    desc: [
      "Full stack web app enabling upperclassmen to share campus guidance with new students",
      "Built responsive mobile-optimized interfaces with custom CSS animations",
      "Engineered REST API integration layer for async data handling",
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
  const [visible, setVisible] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisible((prev) => (prev.includes(index) ? prev : [...prev, index]));
            observer.unobserve(entry.target);
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
          <div
            className={`project-card ${visible.includes(index) ? 'is-visible' : ''}`}
            key={index}
            ref={(el) => (refs.current[index] = el)}
            data-index={index}
          >
            {project.image && (
              <img src={project.image} alt={project.title} className="project-card-img"/>
            )}

            <div className="project-card-body">
              <div className="project-card-header">
                <h2 className="project-card-title">{project.title}</h2>
                <span className="project-card-date">{project.date}</span>
              </div>

              <ul className="project-card-desc">
                {project.desc.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              <div className="project-card-tools">
                {project.tools.map((tool, i) => (
                  <span className="project-tool-tag" key={i}>{tool}</span>
                ))}
              </div>

              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="project-card-link">
                  View Live ↗
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