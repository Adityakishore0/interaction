import React, { useState, useEffect, lazy, Suspense } from 'react';
import './Envelope.css';

// Lazy load the videos to improve performance
const SadVideo = lazy(() => import('../files/sad.mp4'));
const HappyVideo = lazy(() => import('../files/happy.mp4'));
const AskVideo = lazy(() => import('../files/ask.mp4'));

const Envelope = () => {
  const [showButton, setShowButton] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: '60%', left: '30%' });
  const [showConfirmNo, setShowConfirmNo] = useState(false);
  const [showSadVideo, setShowSadVideo] = useState(false);
  const [showHappyVideo, setShowHappyVideo] = useState(false); // State for happy video

  useEffect(() => {
    const preloadImages = () => {
      const askImage = new Image();
      askImage.src = require('../files/askimage.jpg');
    };
    preloadImages();
  }, []);

  const handleEnvelopeClick = () => {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    envelopeWrapper.classList.toggle('flap');

    setTimeout(() => {
      setShowButton(true);
    }, 1500);
  };

  const handleButtonClick = () => {
    setShowVideo(true);
  };

  const handleVideoEnded = () => {
    setShowQuestion(true);
  };

  const handleNoHover = () => {
    if (noHoverCount < 4) {
      const newPosition = {
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      };
      setNoPosition(newPosition);
      setNoHoverCount(prevCount => prevCount + 1);
    }
  };

  const handleResponse = (response) => {
    if (response === 'No') {
      setShowConfirmNo(true);
    } else if (response === 'Yes') {
      setShowHappyVideo(true);
      setShowConfirmNo(false);
      setShowQuestion(false);
      setShowVideo(false);
      setShowButton(false);
    } else if (response === 'Confirm No') {
      setShowSadVideo(true);
      setShowConfirmNo(false);
      setShowQuestion(false);
      setShowVideo(false);
      setShowButton(false);
    }
  };

  const handleBackToFirstQuestion = () => {
    setShowConfirmNo(false);
    setShowQuestion(true);
  };

  return (
    <div className='container'>
      {!showSadVideo && !showHappyVideo ? (
        <>
          {!showVideo ? (
            <>
              <div className='envelope-wrapper' onClick={handleEnvelopeClick}>
                <div className='envelope'>
                  <div className='letter'>
                    <img
                      src={require('../files/askimage.jpg')}
                      alt='Ask'
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
                <div className='heart'></div>
              </div>
              {showButton && (
                <button className='show-image-button' onClick={handleButtonClick}>
                  See This Picture
                </button>
              )}
            </>
          ) : (
            <>
              <Suspense fallback={<div>Loading video...</div>}>
                <AskVideo />
              </Suspense>
              {showQuestion && !showConfirmNo && (
                <div className="question-overlay">
                  <p>Do you want to go out with me?</p>
                  <button onClick={() => handleResponse('Yes')}>Yes</button>
                  <button
                    onMouseEnter={handleNoHover}
                    style={{ position: 'absolute', top: noPosition.top, left: noPosition.left }}
                    onClick={() => handleResponse('No')}
                  >
                    No
                  </button>
                </div>
              )}
              {showConfirmNo && (
                <div className="question-overlay">
                  <p>Do you really want to say no?</p>
                  <button onClick={() => handleResponse('Confirm No')}>Yes</button>
                  <button onClick={handleBackToFirstQuestion}>No</button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <Suspense fallback={<div>Loading video...</div>}>
          {showSadVideo ? <SadVideo /> : <HappyVideo />}
        </Suspense>
      )}
    </div>
  );
};

export default Envelope;
