import React, { useEffect, useRef } from 'react';
import { useState } from "react";
import '../styles/Wisp.css'


const frameWidth = 96; // 32px native * 3x scale

function Wisp({ starsEnabled, setStarsEnabled, factsEnabled, setFactsEnabled }){
    const wispIdlePath = `${import.meta.env.BASE_URL}wisp_idle.png`;
    const wispDownPath = `${import.meta.env.BASE_URL}wisp_down.png`;
    const wispUpPath = `${import.meta.env.BASE_URL}wisp_up.png`;

    const [wispVisible,setWispVisible] = useState(false);
    const [showGreeting,setShowGreeting] = useState(false);
    const [wispAni,setWispAni] = useState(wispIdlePath);
    const [wispFrame,setWispFrame] = useState(12); // represents the total frame count of the current animation. 
    const [frame, setFrame] = useState(0); // sets the current frame for the sprite
    const [scrollDirection, setScrollDirection] = useState('neutral');  //tells u if the direction is up down or neutral
    const lastScrollY = useRef(0);  // keeps track of last scroll position 
    const [movingDown,setMovingDown] = useState(false);
    const [movingUp,setMovingUp] = useState(false);
    const [translateY, setTranslateY] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [hasArrived,setHasArrived] = useState(false); // triggers when an animation ends 
    const[isOverShooting,setIsOverShooting] = useState(false); // keeps track of if the animation where the wisp sloowly moves back to target after overshooting it
    const[overShootTarget,setOverShootTarget] = useState(0); 
    const [scrollVelocity,setScrollVelocity] = useState(0); // determines how fast the scroll was. (used as multiplier to determine how much overshoot the wisp will have)
    const [scrollY, setScrollY] = useState(0); // Holds the current position of the scroll wheel
    const [showOptions, setShowOptions] = useState(false); // controls if prompt options are visible 
    const [lightMode,setLightMode] = useState(false);
    const [isClosing,setIsClosing] = useState(false); // State that controls when the fade out animation will begin. instead of just disappearing with no animation
    const FADE_DURATION_MS = 2000; // how long it takes for the prompt options to disappear 
    const [prompt,setPrompt] = useState("Click me, im here to help!");
    const [factsClicked,setFactsClicked] = useState(false); // the three states below help me know what prompt opt was clicked
    const [lightClicked,setLightClicked] = useState(false);
    const [bgClicked,setBgClicked] = useState(false);

    const [frameWidth, setFrameWidth] = useState(
        window.innerWidth <= 768 ? 64 : 96
    );

    useEffect(() => {
        const handleResize = () => {
            setFrameWidth(window.innerWidth <= 768 ? 64 : 96);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const wispInTimer = setTimeout(() => {
            setWispVisible(true);
            setPrompt("Im here to help!");
            const greetingTimer = setTimeout(() => { // a second timer in the first one. it spawns the greeting after the wisp is done fading
                    setPrompt("Click me, im here to help!");
                    setShowGreeting(true);
                }, 1000);
        }, 6000);

        const greetingOutTimer = setTimeout(() => { 
            setIsClosing(true); // gives the closing class to the div, once the class is given it starts fading out
            const closeTimer = setTimeout(() => {
                    setIsClosing(false); 
                    setShowGreeting(false);
                    setPrompt("What can I do for you?");
                }, FADE_DURATION_MS);

        }, 6000 + 3000); // 3 seconds after the greeting appears,

        return () => {
            clearTimeout(wispInTimer);
            clearTimeout(greetingOutTimer);
        };
    }, []);



    useEffect(() => { // this use effect pre loads the image. which basically means, it makes sure computer know where image is so it can get to it quicker
        const idleImg = new Image();
        idleImg.src = `${import.meta.env.BASE_URL}wisp_idle.png`;

        const downImg = new Image();
        downImg.src = `${import.meta.env.BASE_URL}wisp_down.png`;

        const upImg = new Image();
        upImg.src = `${import.meta.env.BASE_URL}wisp_up.png`;
    }, []);


    // this use effect handles the scroll logic. when the user scrolls, wat direction they scroll 
    useEffect(() => {
        let scrollTimeout; 


        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);

            if (currentScrollY > lastScrollY.current) {
                setScrollDirection('down');

                
            } else if (currentScrollY < lastScrollY.current) {
                setScrollDirection('up');
            }
            lastScrollY.current = currentScrollY;

            setIsScrolling(true);
            clearTimeout(scrollTimeout); // cancel any pending "stopped" flag
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false); // fires only if no new scroll happened in 150ms
                
            }, 150);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    // the use effect that runs the frames per second ------------------------------
    useEffect(() => {
        
        const interval = setInterval(() => {
            setFrame((prevFrame) => (prevFrame + 1) % wispFrame);
        }, 150);
        
        return () => clearInterval(interval);
    }, [wispFrame]);
 

    // the use effect that runs the down animation
    useEffect(()=>{

        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);

        if (currentScrollY > lastScrollY.current) {
                setScrollDirection('down');

        } else if (currentScrollY < lastScrollY.current) {
                setScrollDirection('up');
            }
        lastScrollY.current = currentScrollY;
        if (scrollDirection === "down"){
            if (scrollY - translateY > window.innerHeight*0.15) { // only moves once the users screen is passing him up slightly
                if (!movingDown){  // makes sure you dont keep changing the animation to same animation 
                    setWispFrame(3);
                    setFrame(0);
                }
                setWispAni(wispDownPath);
                setMovingDown(true);
                
                console.log(window.scrollY);

                setScrollVelocity(((scrollY+80)-translateY)/1400); // i divide by 1400 because that is the time it takes to finish the animation
                setTranslateY(scrollY + 80); 
            }
        }

        if (scrollDirection === "up"){
            if (Math.abs(scrollY - translateY) > window.innerHeight*.50) { // only moves once the users screen is passing him up and scrolling off screen
                if (!movingUp){  // makes sure you dont keep changing the animation to same animation 
                    setFrame(0); // resets the current frame the wisp is in. I do this because what if current frame is 8 but the new animation only got 3 frames?
                
                    setWispFrame(3);
                }
                setWispAni(wispUpPath);
                setMovingUp(true);
                
                console.log(window.scrollY);
                setScrollVelocity(((scrollY+80)-translateY)/1400); // i divide by 1400 because that is the time it takes to finish the animation
                setTranslateY(scrollY + 80); 
            }
        }

    },[scrollY]);

    // the use effect below controls when the wisp becomes idle. once the transform animation ends this is fired
    useEffect(() => {
        if (hasArrived) {
            console.log("idle swap fired");
            setScrollDirection("neutral");
            setWispFrame(12);
            setWispAni(wispIdlePath);
            setFrame(0);
            setIsOverShooting(true);
        }
    }, [hasArrived]);

    // this is second faze of ending the animation. over shoot is how much the wisp slowly moves up after he rushes down
    useEffect(() => {
        if (isOverShooting) {
            let velocity = 0;
            
             //setTranslateY((prevY) => prevY + (scrollVelocity*100));
             if (scrollVelocity >2){
                velocity = 1.8;
             }
             else{
                velocity = scrollVelocity;
             }
             console.log("velocity is ",velocity);
            setTranslateY((prevY) => prevY - velocity * 100);

            console.log("overshooting swap fired");
            setHasArrived(false);
            setIsOverShooting(false);
            setMovingDown(false);
            setMovingUp(false);
        }
    }, [isOverShooting]);



    useEffect(() => {
        if (lightMode) {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
    }, [lightMode]);
    

 
    // Happens whn the user clicks on a prompt option. it checks to  see which was clicked. -----------------
    const handleToggleClick = (option) => {
        if(option ==="toggle-facts"){
            setFactsClicked(true);
            if (factsEnabled){
                setPrompt("Turning off facts");
            }
            else{
                setPrompt("Turning on Facts");
            }
        }
        else if(option ==="toggle-light-mode"){
            setLightClicked(true);
            if (lightMode){
                setPrompt("Fine....");
            }
            else{
                setPrompt("Light it up!!");
            }
        }
        else if(option ==="toggle-background"){
            setBgClicked(true);
            if (starsEnabled){
                setPrompt("Background... off!");
            }
            else{
                setPrompt("Turning on circles!");
            }
        }
        if (showOptions) {
            setIsClosing(true);
            setTimeout(() => {
                setShowOptions(false);
                setIsClosing(false);
                setBgClicked(false);
                setLightClicked(false);
                setFactsClicked(false);
                setPrompt("What would you like me to do for you? ");
            }, FADE_DURATION_MS);
        } else {
            setShowOptions(true);
        }

    };


return (
    <div className='wisp-wrapper'>
        <div
            className={`wisp ${wispVisible ? "wispVisible" : ""}`}
            onTransitionEnd={() => {if (movingDown && !isOverShooting || movingUp && !isOverShooting) {setHasArrived(true);}}}
            style={{
                backgroundImage: `url(${wispAni})`,
                backgroundPositionY: `-${frame * frameWidth}px`,
                transform: `translateY(${translateY}px)`,
            }}
        >
            <div className="wisp-hit-box" onClick={() => setShowOptions((prev) => !prev)}>
                
            </div>

        </div>
            {showGreeting && (
                <div className="command-opt" style={{transform: `translateY(${translateY}px)`}}>
                    <div className={`wisp-prompt ${isClosing ? "closing" : ""}`}>{prompt}</div>
                </div>
            )}

            {showOptions && !showGreeting && (
                <div className="command-opt" style={{transform: `translateY(${translateY}px)`}}>
                    <div className={`wisp-prompt ${isClosing ? "closing" : ""}`}>{prompt}</div>
                    <ul style={{ animationDuration: isClosing ? `${FADE_DURATION_MS}ms` : undefined }}>
                        <li className={`toggle-facts ${isClosing ? "closing" : ""} ${factsClicked ? "lingers" : ""}`} onClick={() => {setFactsEnabled((prev) => !prev); handleToggleClick("toggle-facts");}}>Turn {factsEnabled ? "off" : "on"} fun facts</li>
                        <li className={`toggle-lightmode ${isClosing ? "closing" : ""} ${lightClicked ? "lingers" : ""}`} onClick={() => {setLightMode((prev)=> !prev); handleToggleClick("toggle-light-mode"); }}>Turn {lightMode ? "off" : "on"} light mode</li>
                        <li className={`toggle-background ${isClosing ? "closing" : ""} ${bgClicked ? "lingers" : ""}`} onClick={() => {setStarsEnabled((prev) => !prev); handleToggleClick("toggle-background"); }}>Turn {starsEnabled ? "off" : "on"} background animations</li>
                    </ul>
                </div>
            )}
    </div>
)}

export default Wisp;