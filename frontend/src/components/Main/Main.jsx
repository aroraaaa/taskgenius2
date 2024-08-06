import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
    const { onSent, recentprompt, showresult, loading, resultdata, setInput, input } = useContext(Context);
    const [recognition, setRecognition] = useState(null);
    const [listening, setListening] = useState(false);
    const [authenticated, setAuthenticated] = useState(false); // State to check if user is authenticated
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognizer = new SpeechRecognition();
            recognizer.continuous = false;
            recognizer.interimResults = false;
            recognizer.lang = 'en-US';

            recognizer.onstart = () => {
                setListening(true);
            };

            recognizer.onresult = (event) => {
                const speechResult = event.results[0][0].transcript;
                setInput(prevInput => prevInput + ' ' + speechResult);
                setListening(false);
            };

            recognizer.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setListening(false);
            };

            recognizer.onend = () => {
                setListening(false);
            };

            setRecognition(recognizer);
        } else {
            console.error('Speech recognition not supported in this browser.');
        }
    }, [input]);

    const handleMicClick = () => {
        if (recognition) {
            recognition.start();
        }
    };

    const handleSendClick = () => {
        onSent(input);
    };

    const handleGalleryClick = () => {
        if (authenticated) {
            navigate('/ai');
        } else {
            navigate('/auth'); // Redirect to login/signup if not authenticated
        }
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>TaskGenius</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showresult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div onClick={() => {
                                const text = 'What is react js';
                                setInput(text);
                                onSent(text);
                            }} className="card">
                                <p>What is react js</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => {
                                const text = "Write a short story about a time traveler who accidentally changes a small event in the past.";
                                setInput(text);
                                onSent(text);
                            }}>
                                <p>Write a short story about a time traveler who accidentally changes a small event in the past.</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => {
                                const text = 'Create a lesson plan for a high school math class on the topic of quadratic equations';
                                setInput(text);
                                onSent(text);
                            }}>
                                <p>Create a lesson plan for a high school math class on the topic of quadratic equations.</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => {
                                const text = 'Explain how blockchain technology works and discuss its potential applications in various industries.';
                                setInput(text);
                                onSent(text);
                            }}>
                                <p>Explain how blockchain technology works and discuss its potential applications in various industries.</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentprompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                                ? <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultdata }}></p>}
                        </div>
                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder='Enter a prompt here' 
                            onKeyPress={(e) => { if (e.key === 'Enter') handleSendClick(); }}
                        />
                        <div>
                            <img className='ai'
                                src={assets.gallery_icon}
                                alt=""
                                onClick={handleGalleryClick} // Check authentication before navigating
                            />
                            <img
                                src={assets.mic_icon}
                                alt=""
                                onClick={handleMicClick}
                                className={listening ? 'listening' : ''}
                            />
                            {input ? <img onClick={handleSendClick} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        TaskGenius can make mistakes. Kindly double-check it for yourself as well.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
