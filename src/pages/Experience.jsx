import React, { useEffect, useRef } from 'react';
import '../styles/Experience.css';

function Experience() {
  return (
    <div className='experience'>
      <h1 classNa="exp-header">Experience</h1>
      <div className='exp-header-lines'>
        <div className='exp-line-1'/>
        <div className='exp-line-2'/>
        <div className='exp-line-3'/>
      </div>
      <div className="exp-content">
      <div className="jobs">
        <div className="job">
          <div className="org-row">
            <div className="org">
              The Meharry Medical college/Vanderbilt-Ingram Cancer Center/
            </div>
            <div className="job-date">December 2024 – May 2025</div>
          </div>
          <div className="org subtitle">
            Tennessee State University Cancer Partnership (MVTCP)
          </div>
          <div className="job-title">Web Developer</div>
          <div>
            <div>•	Managed and updated the stopcancertogether.org website (WordPress) for the MVT Cancer Partnership, utilizing HTML, CSS, and JavaScript for customization.</div>
            <div>•	Modernized and revamped pages and content with screen responsiveness and improved user experience.</div>
            <div>•	Collaborated with academic and healthcare experts to implement content updates and layout improvements. </div>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}

export default Experience;