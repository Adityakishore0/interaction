import React, { useState } from 'react';
import './Envelope.css';
import askImage from '../files/askimage.jpg';

const Envelope = () => {
  const [showButton, setShowButton] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: '60%', left: '30%' });
  const [showConfirmNo, setShowConfirmNo] = useState(false);
  const [showSadVideo, setShowSadVideo] = useState(false);
  const [showHappyVideo, setShowHappyVideo] = useState(false); // State for happy video

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
      // Show happy video and hide everything else
      setShowHappyVideo(true); // Show happy video
      setShowConfirmNo(false); // Hide confirm question
      setShowQuestion(false); // Hide the first question
      setShowVideo(false); // Stop previous video
      setShowButton(false); // Hide button
    } else if (response === 'Confirm No') {
      setShowSadVideo(true); // Show sad video
      setShowConfirmNo(false); // Hide confirm question
      setShowQuestion(false); // Hide initial question
      setShowVideo(false); // Stop previous video
      setShowButton(false); // Hide button
    }
  };

  const handleBackToFirstQuestion = () => {
    setShowConfirmNo(false); // Hide confirm question
    setShowQuestion(true); // Show the first question again
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
                    <img src={askImage} alt='Ask' style={{ width: '100%', height: 'auto' }} />
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
              <video
                autoPlay
                
                className="background-video"
                onEnded={handleVideoEnded}
                controls={false}
              >
                <source src={require('../files/ask.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
        <video
          autoPlay
         
          className="background-video"
          controls={false}
        >
          <source src={showSadVideo ? require('../files/sad.mp4') : require('../files/happy.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Envelope;