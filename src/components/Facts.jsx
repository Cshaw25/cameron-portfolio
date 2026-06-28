import React, { useEffect, useRef } from 'react';
import { useState } from "react";
import '../styles/Facts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const facts = [
  "Cameron paints and designs all kinds of shoes in his off time and records the entire process, giving him an eye for design whether tech-related or not.",
  "Cameron has a pet crested gecko named Java (after the first programming language he ever learned).",
  "One of the earliest projects Cameron worked on was creating an exact replica of the Smoothie King website's landing page (view on GitHub).",
  "Cameron led his senior project team, which focused on object detection from aerial views (drones), and presented it in front of the school's computer science department, which led to his team being picked to present the project in front of numerous tech professionals and college of engineering professors.",
  "For Cameron's final project in his game programming course (awarded one of the highest scores in the class), he created a 2D top-down RPG game demo called Scription. (See more on Github) "
];

function Facts({factsEnabled}){
    const [factIndex, setFactIndex] = useState(0);
    const [factVisible, setFactVisible] = useState(false);
    const [timer, setTimer] = useState(20000);  /* the timer is set low at first so the employer can see fun facts component fast. then it slows down */
    let seen_fact = false;
    const [isFirstRender,setFirstRender] = useState(true);


    /* randomly picks an index, in return section it will accesss that rand indx */
    useEffect(() => {
        if(factsEnabled){
            const interval = setInterval(() => {
                seen_fact = true;
                if (!factVisible && factsEnabled) {
                    setFactIndex(prevIndex => {
                        let newIndex;
                        do {
                            newIndex = Math.floor(Math.random() * facts.length);
                        } while (newIndex === prevIndex);

                        return newIndex;
                    });

                    setFactVisible(true);
                    setTimer(60000);
                }
            }, timer);

            return () => clearInterval(interval);
        }
    }, [factVisible]);

    /* a second timer, it auto closes the fact (if visible) every 30 seconds */

    useEffect(() => {
        if (!factVisible) return;

        const timeout = setTimeout(() => {
            setFactVisible(false);
        }, 60000);

        return () => clearTimeout(timeout);
    }, [factVisible]);


    useEffect(()=>{
    if (isFirstRender) {
        setFirstRender(false);
        return; // skip everything below on mount
    }
        if(factsEnabled){
            setFactVisible(true);
            let newIndex = Math.floor(Math.random() * facts.length); 
            setFactIndex(newIndex);}
        else{setFactVisible(false);}
        
    },[factsEnabled])




return (
    <div className={`facts ${factVisible ? "visible" : ""}`}>
        <div className="close-out" onClick={() => setFactVisible(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
        </div>
        <div className="facts-wrapper">
            <div className="facts-container">
                <div className="head">Fun Fact</div>
                <div className="underline"></div>
                <div className="para-content">{facts[factIndex]}</div>
            </div>
        </div>

    </div>
)}

export default Facts;