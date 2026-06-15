import React, { useEffect, useRef } from 'react';
import '../styles/About.css';

function About() {
    const imageHolderRef = useRef(null);
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

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
        if (imageRef.current) observer.observe(imageRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const container = imageHolderRef.current;
        if (!container) return;

        const interval = setInterval(() => {
            const { scrollLeft, scrollWidth, clientWidth } = container;

            if (scrollLeft + clientWidth >= scrollWidth - 2) {
                container.scrollTo({ left: 0, behavior: 'instant' });
            } else {
                container.scrollBy({ left: clientWidth, behavior: 'smooth' });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='about'>
            <h1 className="header fade-up" ref={headerRef}>About Me</h1>
            <div className='header-lines'>
                <div className='header-line-1'/>
                <div className='header-line-2'/>
                <div className='header-line-3'/>
            </div>
            <div className="about-content">
                <div className="about-para-container fade-up" ref={contentRef}>
                    <span className="about-name">Hey I'm Cameron Shaw</span>
                    <div className="about-name-underline"/>
                    <p className="about-para">
                        I'm from Memphis, Tennessee, born in New Orleans, Louisiana. I'm a recent computer science graduate from Tennessee State University, pursuing a master's degree in computer science at Georgia Tech. My main focus is in web development and AI. I have skills ranging across the full stack including Java, Python, React, and MySQL. But truthfully, I simply enjoy designing and building helpful things for people to use in their everyday lives, whether that's a web app, mobile app, or something embedded.

                        I was a front end developer at MVTCP, a cancer research partnership between Meharry, TSU, and Vanderbilt. I would take in requests from the Community Advisory Board, update their website with improved responsiveness, and present changes and updates to stakeholders.

                        I have an innovative mind in everything I do, I ask myself: how can I automate this? How can I make this process easier using technology? How can writing a line of code have a measurable impact on people's real lives?
                    </p>
                    <p className="about-cta">
                        I'm open to new opportunities in software engineering. If there are any current roles available, feel free to contact me or I would love to connect with you on LinkedIn!
                    </p>
                </div>

                <div className="about-image fade-up" ref={imageRef}>
                    <div className="mobile-top"/>
                    <div className="image-holder" ref={imageHolderRef}>
                        <img src={`${import.meta.env.BASE_URL}self.jpg`} alt="Cameron Shaw" />
                        <img src={`${import.meta.env.BASE_URL}afro-tech2.jpg`} alt="Cameron Shaw" />
                        <img src={`${import.meta.env.BASE_URL}HeadShot.jpg`} alt="Cameron Shaw" />
                        <img src={`${import.meta.env.BASE_URL}self.jpg`} alt="Cameron Shaw" />
                    </div>
                    <div className="mobile-bottom"/>
                </div>
            </div>
        </div>
    );
}

export default About;