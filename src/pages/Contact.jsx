import React, { useRef } from 'react';
import '../styles/Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Contact() {
  return (
    <div className='contact'>
        <div className="contact-content">
            <div className="contact-button">
                Contact Me <FontAwesomeIcon icon={faArrowRight} className="contact-arrow"/>
            </div>
            <div className="contact-methods">
                <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="contact-icon">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com/cshaw25" target="_blank" rel="noreferrer" className="contact-icon">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="mailto:yourmail@email.com" className="contact-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            </div>
        </div>
        <p className="footer-copy">© 2025 Cameron Shaw. All rights reserved.</p>
    </div>
  );
}

export default Contact;