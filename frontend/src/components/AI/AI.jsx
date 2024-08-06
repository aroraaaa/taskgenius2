import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AI.css';
import { assets } from '../../assets/assets';

const AI = () => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(assets.gallery_icon);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth');
        }
    }, [navigate]);

    const apiKey = import.meta.env.VITE_OCTOAI_API_KEY;

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://image.octoai.run/generate/sdxl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                    "User-Agent": "Chrome"
                },
                body: JSON.stringify({ prompt: `${inputRef.current.value}` }),
            });
            const data = await response.json();
            setLoading(false);

            if (data && data.images && data.images.length > 0) {
                setImageUrl(`data:image/jpeg;base64,${data.images[0].image_b64}`);
            }
        } catch (error) {
            console.error('Error generating image:', error);
            setLoading(false);
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'image.jpg';
        link.click();
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); 
    }

    return (
        <div className='main'>
            <div className='back'>
                <img onClick={() => navigate('/')} src={assets.youtube_icon} alt="Back" />
            </div>
            <div className="center">
                <h1>AI Image Generator</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <img src={imageUrl} alt="Generated or Default Image" />
                    </div>
                )}
                <div className="search">
                    <input type="text" ref={inputRef} className='search-input' placeholder='Describe the image you want to see' />
                    <div className="btn" onClick={imageGenerator}>Generate</div>
                </div>
                <button className="download-button" onClick={handleDownload}>
                    Download Image
                </button>
            </div>
            <div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default AI;
