import React, { useState, useEffect, useRef, useCallback } from 'react';

const Showreel = () => {
  const [activeClass, setActiveClass] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);
  const animationTimeoutRef = useRef(null);

  const showreelItems = [
    {
      id: 1,
      title: 'Cinematic Adventures',
      topic: 'Travel Films',
      description: 'Journey through breathtaking landscapes and vibrant cultures. Each frame is a story, meticulously crafted to inspire wanderlust and awe.',
      video: '/assets/portfolioVideos/Neelanath.mp4',
    },
    {
      id: 2,
      title: 'Brand Anthems',
      topic: 'Commercials',
      description: 'Dynamic and compelling brand stories that capture attention, evoke emotion, and drive results for leading global brands.',
      video: '/assets/portfolioVideos/SobhaConstruction.mp4',
    },
    {
      id: 3,
      title: 'Rhythmic Visions',
      topic: 'Music Videos',
      description: 'Visual masterpieces synchronized with sound, creating immersive experiences that elevate the music and connect with audiences.',
      video: '/assets/portfolioVideos/SanamPuri.mp4',
    },
    {
      id: 4,
      title: 'Awards and Functions',
      topic: 'Event Highlights',
      description: 'Capturing the essence and excitement of prestigious events, showcasing memorable moments with elegance and flair.',
      video: '/assets/portfolioVideos/Ranbir.mp4',
    },
    {
      id: 5,
      title: 'Product in Motion',
      topic: 'Brand Films',
      description: 'Sleek and sophisticated product showcases that highlight design, functionality, and innovation in a visually captivating way.',
      video: '/assets/portfolioVideos/POCO.mp4',
    },
  ];

  const totalItems = showreelItems.length;

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveClass('next');
    
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
      setActiveClass('');
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, totalItems]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveClass('prev');
    
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
      setActiveClass('');
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, totalItems]);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAnimating) {
      timeoutRef.current = setTimeout(handleNext, 5000);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isAnimating, handleNext]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Get next item for preview
  const getNextItem = () => {
    const nextIndex = (currentIndex + 1) % totalItems;
    return showreelItems[nextIndex];
  };

  const nextItem = getNextItem();

  return (
    <section id="showreel" className="relative h-screen text-white overflow-hidden bg-black">
      <div className={`showreel-carousel ${activeClass}`}>
        {/* Current Video */}
        <div className="main-video">
          <video 
            src={showreelItems[currentIndex].video} 
            className="video-slide" 
            autoPlay 
            muted 
            loop 
            playsInline
            key={currentIndex}
            onError={(e) => {
              e.target.style.backgroundColor = '#1a1a1a';
            }}
          />
          <div className="content">
            <div className="author">ANURAG MEDIAWORKS</div>
            <div className="title">{showreelItems[currentIndex].title}</div>
            <div className="topic">{showreelItems[currentIndex].topic}</div>
            <div className="des">{showreelItems[currentIndex].description}</div>
          </div>
        </div>

        {/* Next Video Preview - Bottom Right */}
        <div className="next-preview">
          <div className="preview-container">
            <video 
              src={nextItem.video} 
              className="preview-video" 
              autoPlay 
              muted 
              loop 
              playsInline
              onError={(e) => {
                e.target.style.backgroundColor = '#1a1a1a';
              }}
            />
            <div className="preview-overlay">
              <span>NEXT</span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="arrows">
          <button 
            className="arrow-btn prev-btn" 
            onClick={handlePrev}
            disabled={isAnimating}
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="arrow-btn next-btn" 
            onClick={handleNext}
            disabled={isAnimating}
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className={`time ${activeClass ? 'running' : ''}`}></div>

        
        
      </div>

      <style>{`
        .showreel-carousel {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
        }
        
        .main-video {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .main-video .video-slide {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-color: #1a1a1a;
          transition: opacity 0.5s ease-in-out;
        }
        
        .main-video .content {
          position: absolute;
          top: 20%;
          width: min(1140px, 80%);
          left: 50%;
          transform: translateX(-50%);
          padding-right: min(30%, 200px);
          box-sizing: border-box;
          color: #fff;
          text-shadow: 0 5px 10px rgba(0,0,0,0.4);
        }
        
        .main-video .content > * {
          animation: slideInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .main-video .content .author {
          animation-delay: 0.1s;
          font-weight: bold;
          letter-spacing: 8px;
          font-size: 0.9em;
          margin-bottom: 10px;
        }
        
        .main-video .content .title {
          animation-delay: 0.3s;
          font-size: clamp(2em, 5vw, 5em);
          font-weight: bold;
          line-height: 1.2em;
          margin: 5px 0;
          background: linear-gradient(45deg, #FFD700, #32CD32, #00CED1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .main-video .content .topic {
          animation-delay: 0.5s;
          font-size: clamp(2em, 5vw, 5em);
          font-weight: bold;
          line-height: 1.2em;
          margin: 5px 0;
          background: linear-gradient(45deg, #FFD700, #32CD32, #00CED1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .main-video .content .des {
          animation-delay: 0.7s;
          margin: 20px 0;
          line-height: 1.6;
          font-size: 1.1em;
          color: #e0e0e0;
        }
        
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Next Video Preview - Bottom Right */
        .next-preview {
          position: absolute;
          bottom: 40px;
          right: 40px;
          z-index: 100;
          width: 180px;
          height: 120px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid transparent;
          background: linear-gradient(45deg, #FFD700, #32CD32, #00CED1);
          background-clip: padding-box;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .next-preview:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        }
        
        .preview-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          overflow: hidden;
          background: #000;
        }
        
        .preview-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-color: #1a1a1a;
        }
        
        .preview-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(50,205,50,0.1), rgba(0,206,209,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .next-preview:hover .preview-overlay {
          opacity: 1;
        }
        
        .preview-overlay span {
          color: #fff;
          font-weight: bold;
          font-size: 14px;
          letter-spacing: 2px;
          background: rgba(0,0,0,0.7);
          padding: 8px 16px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        
        /* Navigation Arrows */
        .arrows {
          position: absolute;
          top: 50%;
          right: 40px;
          transform: translateY(-50%);
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .arrow-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255,255,255,0.2);
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .arrow-btn:hover:not(:disabled) {
          background: linear-gradient(45deg, #FFD700, #32CD32, #00CED1);
          border-color: transparent;
          transform: scale(1.1);
          color: #000;
        }
        
        .arrow-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        
        /* Contact Button */
        .contact-btn {
          position: absolute;
          top: 40px;
          left: 40px;
          z-index: 100;
        }
        
        .contact-button {
          padding: 12px 24px;
          background: transparent;
          border: 2px solid #fff;
          color: #fff;
          font-weight: 600;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 4px;
          font-family: inherit;
        }
        
        .contact-button:hover {
          background: linear-gradient(45deg, #FFD700, #32CD32, #00CED1);
          border-color: transparent;
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(255, 215, 0, 0.3);
        }
        
        /* Progress Bar */
        .time {
          position: absolute;
          z-index: 1000;
          width: 0;
          height: 4px;
          background: linear-gradient(90deg, #FFD700, #32CD32, #00CED1);
          left: 0;
          top: 0;
          transition: width 5s linear;
        }
        
        .time:not(.running) {
          width: 100%;
        }
        
        .time.running {
          width: 0;
          transition: width 0.5s ease;
        }
        
        /* Responsive Design */
        @media screen and (max-width: 768px) {
          .main-video .content {
            padding-right: 20px;
            top: 30%;
            width: 90%;
          }
          
          .main-video .content .title,
          .main-video .content .topic {
            font-size: clamp(1.5em, 8vw, 3em);
          }
          
          .main-video .content .des {
            font-size: 1em;
            line-height: 1.4;
          }
          
          .next-preview {
            bottom: 20px;
            right: 20px;
            width: 120px;
            height: 80px;
          }
          
          .arrows {
            right: 20px;
            gap: 8px;
          }
          
          .arrow-btn {
            width: 40px;
            height: 40px;
          }
          
          .arrow-btn svg {
            width: 18px;
            height: 18px;
          }
          
          .contact-btn {
            top: 20px;
            left: 20px;
          }
          
          .contact-button {
            padding: 8px 16px;
            font-size: 0.9em;
          }
        }
        
        @media screen and (max-width: 480px) {
          .main-video .content {
            width: 95%;
            top: 25%;
          }
          
          .main-video .content .author {
            font-size: 0.7em;
            letter-spacing: 4px;
          }
          
          .next-preview {
            width: 100px;
            height: 70px;
            bottom: 15px;
            right: 15px;
          }
          
          .preview-overlay span {
            font-size: 12px;
            padding: 6px 12px;
          }
          
          .arrows {
            bottom: 120px;
            right: 15px;
            flex-direction: row;
            top: auto;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Showreel;