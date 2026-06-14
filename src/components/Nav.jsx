import React from 'react';
import '../styles/Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Nav(){
    
  return (
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a className="abt-btn" href="#about">About</a></li>
            <li className="nav-contact">
                <a className="nav-contact-link">Contact</a>
                <a href="https://www.linkedin.com/in/cameron-shaw-9bb847215" target="_blank" rel="noreferrer" className="nav-icon">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com/cshaw25" target="_blank" rel="noreferrer" className="nav-icon">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="mailto:came980@gmail.com" className="nav-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            </li>

        </ul>
    </nav>
  );
};

export default Nav;