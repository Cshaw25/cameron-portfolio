import React, { useEffect, useRef, useState } from 'react';
import '../styles/Experience.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Experience() {
  const [activeTab, setActiveTab] = useState('experience');
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const jobRefs = useRef([]); // holds refs for each job card

  // fade in header and content when they enter the viewport
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

  // stagger fade in each job card when experience tab is active
  useEffect(() => {
    if (activeTab === 'experience') {
      setTimeout(() => {
        const jobObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const index = Number(entry.target.dataset.index);
                // delay each card slightly so they dont all pop in at once
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
      }, 50); // small delay so DOM renders before we observe
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

        {/* tab switcher */}
        <div className="picker-wrapper">
          <div className="picker">
            <div
              className={`picker-item ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </div>
            <div
              className={`picker-item ${activeTab === 'certifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('certifications')}
            >
              Certifications
            </div>
          </div>
        </div>

        {activeTab === 'experience' && (
          <div className="jobs" key="experience">

            {/* job 1 */}
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
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Managed and updated the stopcancertogether website for the MVT Cancer Partnership utilizing HTML, CSS, and JavaScript for customization</div>
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Modernized and revamped pages and content with screen responsiveness and improved user experience</div>
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Collaborated with academic and healthcare experts to implement content updates and layout improvements</div>
              </div>
            </div>

            {/* job 2 */}
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
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Gained hands-on experience with network infrastructure, and surveillance systems</div>
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Ran Category 5 and 6 ethernet cords to provide CCTV systems with high-speed data connectivity</div>
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Assisted in installation of automated traffic systems for the City of Memphis including speed detection cameras and strobe flash units</div>
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Monitored and installed internal and external security cameras for commercial, residential, and city-level clients</div>
              </div>
            </div>
          </div>
        )}

        {/* certifications list */}
        {activeTab === 'certifications' && (
          <div className="jobs tab-fade" key="certifications">
            <div className="job fade-up visible">
              <div className="org-row">
                <div className="org">Amazon Web Services (AWS)</div>
                <div className="job-date">August 2026</div>
              </div>
              <div className="job-title">AWS Certified Cloud Practitioner</div>
              <div className="job-bullets">
                <div className="job-bullet"><FontAwesomeIcon icon={faChevronRight} className='service-icon'/> Validated foundational knowledge of AWS Cloud concepts, core services, security, and pricing</div>
                <div className="job-bullet">
                <FontAwesomeIcon icon={faChevronRight} className='service-icon'/>
                <a href="https://www.credly.com/badges/4e39021d-ffed-4947-b26b-2892df58b7e9/public_url" target="_blank" rel="noopener noreferrer">
                  View Credential
                </a>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Experience;