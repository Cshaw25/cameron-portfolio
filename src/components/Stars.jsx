import { useEffect, useRef } from 'react';
import '../styles/Stars.css';

function createStar(container) {
  const star = document.createElement('div');
  star.classList.add('star');

  const size = Math.random() * 10.5 + 0.5;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDuration = `${Math.random() * 3 + 5}s`;
  star.style.animationDelay = `${Math.random() * 3}s`;

  star.addEventListener('animationend', () => {
    star.remove();
    createStar(container);
  });

  container.appendChild(star);
}

function Stars() {
  const starsRef = useRef(null);

  useEffect(() => {
    const container = starsRef.current;
    const max_count = 4;
    const count = Math.floor(Math.random() * max_count) + 1;
    for (let i = 0; i < count; i++) {
      createStar(container);
    }
  }, []);

  return <div className='stars' ref={starsRef}></div>;
}

export default Stars;