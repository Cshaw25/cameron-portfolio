import React, { useEffect } from 'react';
import '../styles/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faCode, faGraduationCap, faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Achievements from './Achievements';
import Experience from './Experience';
import Project from './Project';
import About from './About';
import Contact from './Contact';


function Home() {
  useEffect(() => {
    const message = document.querySelector('.welcome-message');
    message.addEventListener('animationend', () => {
      message.classList.add('slide-left');
      setTimeout(() => {
        {/*message.remove(); */}
      }, 2000);
    });

    const subtitle = document.querySelector('.welcome-subtitle');
    subtitle.addEventListener('animationend', () => {
      subtitle.classList.add('slide-right');
      setTimeout(() => {
        {/* subtitle.remove(); */}
      }, 3000);
    });
    

    
      // trigger content boxes
    const content = document.querySelector('.content');
    const content2 = document.querySelector('.content2');
    const content3 = document.querySelector('.content3');
    const content4 = document.querySelector('.content4');

    setTimeout(() => {
      content.classList.add('unbox');
    }, 3700); // 3700ms after header animation starts

    setTimeout(() => {
      content2.classList.add('unbox2');
    }, 2850); // 2850ms after subtitle animation starts

    setTimeout(() => {
      content3.classList.add('unbox3');
    }, 4300); // 4300ms after header animation starts

    setTimeout(() => {
      content4.classList.add('unbox4');
    }, 4700); // 4700ms after subtitle animation starts 

  }, []);



  

  return (
    <main>
      <div className='home'>
        <div className='welcome-container'>
          <div className='welcome-message'>Welcome to my Portfolio</div>
          <p className='welcome-subtitle'>I'm glad you're here...</p>
        </div>
        {/* content 3 top left, content 1 is bottom left, content 2 is bottom right,content 4 is top right */}
        <div className='content3-slot'> {/* The about me section */}
          <div className='content3'>
            <h2 className='contentHeader'>About Me</h2>
            <div className='box-content'>
              <h3 className='box-name'>Hi, I'm <span>Cameron Shaw</span></h3>
              <div className='tags'>
                <span className='tag'><FontAwesomeIcon icon={faMapPin} /> Memphis, TN</span>
                <span className='tag'><FontAwesomeIcon icon={faCode} /> Full Stack Developer</span>
                <span className='tag'><FontAwesomeIcon icon={faGraduationCap} /> TSU Recent Graduate</span>
                <span className='tag'><FontAwesomeIcon icon={faUser} /> 21 Years Old</span>
                <span className='tag'><FontAwesomeIcon icon={faBriefcase} /> Open to Work</span>
              </div>
              <p className = "content-para">I build and design apps! Whether a prediction platform for sports fans, a tip app for college students, a website for cancer researchers. Full stack is my job, impact is my goal. I strive to build software that actually matter and could make a difference.</p>
            </div>
          </div>
      </div>
      <div className='content4-slot'> {/* The Key skills section */}
        <div className='content4'>
          <h2 className='contentHeader'>Key Skills</h2>
          <div className='skill-content'>
            {[
              {
                label: 'Languages',
                className: 'skill-core',
                skills: ['JavaScript', 'Python', 'Java', 'MySQL', 'HTML / CSS'],
              },
              {
                label: 'Frameworks',
                className: 'skill-fw',
                skills: ['React','Spring Boot', 'FastAPI'],
              },
              {
                label: 'ML / AI',
                className: 'skill-ml',
                skills: ['XGBoost', 'YOLO', 'Pandas', 'NumPy'],
              },
              {
                label: 'Cloud/ Deployment',
                className: 'skill-cloud',
                skills: ['AWS EC2', 'AWS Amplify', 'AWS RDS'],
              },
              {
                label: 'Tools',
                className: 'skill-tools',
                skills: ['Git', 'GitHub', 'VSCode', 'Kafka', 'REST APIs'],
              },
            ].map(({ label, className, skills }) => (
              <div className='skill-category' key={label}>
                <div className='skill-cat-label'>{label}</div>
                <div className='skill-tags'>
                  {skills.map((s) => (
                    <span className={`skill-tag ${className}`} key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
        <div className='content-slot'>
          <div className='content'>
            <h2 className='contentHeader'>Projects Overview</h2>
            <div className = "projects-box">
                <div className= "project">
                  <div className="project-name">TrueBets</div>
                  <div>A web app that uses my custom trained AI model to predict NBA game outcomes. Peaked at <span className='highlight'>70% Accuracy</span>. Live at <a href="https://truthnbets.com/" target="_blank" rel="noreferrer" className='project-link'>truthnbets.com ↗</a></div>
                </div>
                <div className= "project">
                  <div className="project-name">Dashey</div>
                  <div> I'm building a full stack student marketplace platform, allowing student entruepeners to post and allow students to book appointments for a variety of buisnesses. <span className='highlight'>In progress</span></div>
                </div>
                <div className= "project">
                  <div className="project-name">TSU-TIPS</div>
                  <div>Full stack web app for upperclassmen to share campus guidance with new students.Live at <a href="https://cshaw25.github.io/TSU-TIPS-GDG-/frontend/templates/login.html" target="_blank" rel="noreferrer" className='project-link'>cshaw25.github.io/TSU-TIPS-GDG ↗</a> </div>
                </div>
                <div className= "project">
                  <div className="project-name">JPMorgan Simulation</div>
                  <div>Production-style backend financial transaction system built with Kafka and Spring Boot</div>
                </div>
            </div>

            <button className="project-details">See Details</button>
          </div>
        </div>

        <div className='content2-slot'>
          <div className='content2'>
            <h2 className='contentHeader'>Education</h2>
            <div className="education-content">

              <div className="education">
                <div className="education-header">
                  <FontAwesomeIcon icon={faArrowRight} className='education-arrow'/>
                  <span className="school-name">Tennessee State University</span>
                  <span className="school-date">Aug 2022 — May 2026</span>
                </div>
                <div className="education-details">
                  <span className="degree">B.S. in Computer Science</span>
                  <span className="gpa">GPA <span className="gpa-highlight">3.8</span></span>
                </div>
              </div>

              <div className="education-divider"/>

              <div className="education">
                <div className="education-header">
                  <FontAwesomeIcon icon={faArrowRight} className='education-arrow'/>
                  <span className="school-name">Georgia Tech</span>
                  <span className="school-date">Jan 2027 — May 2028</span>
                </div>
                <div className="education-details">
                  <span className="degree">M.S. in Computer Science</span>
                  <span className="gpa">GPA <span className="gpa-highlight">TBD</span></span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
      
    <div id="experience"><Experience /></div>
    <div id="projects"><Project /></div>
    <div id="achievements"><Achievements /></div>
    <div id="about"><About /></div>
    <div id="contact"><Contact /></div>

    </main>
  );
}

export default Home;
