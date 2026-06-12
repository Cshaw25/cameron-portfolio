import React, { useEffect, useRef } from 'react';
import '../styles/Achievements.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMedal } from '@fortawesome/free-solid-svg-icons';


const achievements = [
  { title: "Google Hackathon", desc: "Competed with TSU TIPS project", date: "2024" },
  { title: "TSU Ideathon", desc: "First place. Students are given a real-world problem and must design a software solution under time pressure, then pitch it to industry professionals.", date: "2024",medal: true },
  { title: "AfroTech Conference", desc: "Attended one of the largest Black tech conferences in the world", date: "2024" },
  { title: "CodePath Tutor", desc: "Tutored peers in technical interview prep and programming", date: "2024" },
  { title: "CodePath Alumni", desc: "Completed intro to technical interview prep program", date: "2023" },
  { title: "Honors College", desc: "Member of TSU Honors College", date: "2022" },
  { title: "ACM Member", desc: "Member of Association for Computing Machinery", date: "2022" },
];

function Achievements() {
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.25 } // triggers when 20% of element is visible
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className='achievements'>
      <h1 className="header fade-up" ref={headerRef}>Achievements & Involvement</h1>
      <div className='header-lines'>
        <div className='header-line-1'/>
        <div className='header-line-2'/>
        <div className='header-line-3'/>
      </div>
      <div className='achievements-content pop-in' ref={contentRef}>
        <div className='timeline'>
          {achievements.map((item, index) => (
            <div className='timeline-item' key={index}>
              <div className='timeline-left'>
                <span className='timeline-date'>{item.date}</span>
              </div>
              <div className='timeline-center'>
                <div className='timeline-dot'/>
                {index < achievements.length - 1 && <div className='timeline-line'/>}
              </div>
              <div className='timeline-right'>
              <h3 className='timeline-title'>
                <FontAwesomeIcon icon={faArrowRight} className='timeline-arrow'/>
                {item.title}
                {item.medal && <span className='medal-wrapper'><FontAwesomeIcon icon={faMedal} className='medal-icon'/></span>}
              </h3>
                <p className='timeline-desc'>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Achievements;