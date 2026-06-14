import React, { useEffect, useRef, useState } from 'react';
import '../styles/Experience.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Experience() {
  const [activeTab, setActiveTab] = useState('experience');
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const jobRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeTab === 'experience') {
      setTimeout(() => {
        const jobObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const index = Number(entry.target.dataset.index);
                setTimeout(() => {
                  entry.target.classList.add('visible');
                }, index * 200);
                jobObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );

        jobRefs.current.forEach((el) => {
          if (el) {
            el.classList.remove('visible');
            jobObserver.observe(el);
          }
        });
      }, 50);
    }
  }, [activeTab]);

  return (
    <div className='experience'>
      <h1 className="exp-header fade-up" ref={headerRef}>Experience</h1>
      <div className='exp-header-lines'>
        <div className='exp-line-1'/>
        <div className='exp-line-2'/>
        <div className='exp-line-3'/>
      </div>
      <div className="exp-content fade-up" ref={contentRef}>
        <div className="picker-wrapper">
          <div className="picker">
            <div
              className={`picker-item ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </div>
            <div
              className={`picker-item ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              Services
            </div>
          </div>
        </div>

        {activeTab === 'experience' && (
          <div className="jobs" key="experience">
            <div
              className="job fade-up"
              ref={(el) => (jobRefs.current[0] = el)}
              data-index="0"
            >
              <div className="org-row">
                <div className="org">
                  The Meharry Medical College / Vanderbilt-Ingram Cancer Center
                </div>
                <div className="job-date">December 2024 – May 2025</div>
              </div>
              <div className="org subtitle">
                Tennessee State University Cancer Partnership (MVTCP)
              </div>
              <div className="job-title">Web Developer - Intern</div>
              <div className="job-bullets">
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Managed and updated the stopcancertogether.org website for the MVT Cancer Partnership utilizing HTML, CSS, and JavaScript for customization</div>
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Modernized and revamped pages and content with screen responsiveness and improved user experience</div>
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Collaborated with academic and healthcare experts to implement content updates and layout improvements</div>
              </div>
            </div>

            <div
              className="job fade-up"
              ref={(el) => (jobRefs.current[1] = el)}
              data-index="1"
            >
              <div className="org-row">
                <div className="org">Systems Technologies INC</div>
                <div className="job-date">June 2024 – August 2024</div>
              </div>
              <div className="job-title">Systems Tech Internship</div>
              <div className="job-bullets">
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Gained hands-on experience with network infrastructure, low-voltage wiring standards, and enterprise surveillance systems in live production environments</div>
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Ran Category 5 and 6 ethernet cords to provide CCTV systems with high-speed data connectivity</div>
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Assisted in installation of automated traffic enforcement systems for the City of Memphis including speed detection cameras and strobe flash units</div>
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Monitored and installed internal and external security cameras for commercial, residential, and city-level clients</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="services tab-fade" key="services">
            <div className="serv-header">How I Can Help:</div>
            <div className="serv-list">
              {["Front-end Development", "Back-end Development", "Full Stack Development", "Database Management", "AI Integration"].map((service, i) => (
                <div key={i}>
                  <FontAwesomeIcon icon={faChevronRight} className='service-icon1'/> {service}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Experience;