import React, { useContext, useState } from 'react';
import "./Sidebar.css";
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [ext, setext] = useState(false);
    const { onSent, prevprompts, setRecentprompt, newchat } = useContext(Context);

    const loadprompt = async (prompt) => {
        console.log('Loading prompt:', prompt); // Debugging log
        setRecentprompt(prompt);
        await onSent(prompt, false); // Ensure prompt is not added again
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setext(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={() => newchat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {ext ? <p>New Chat</p> : null}
                </div>
                {ext ? (
                    <div className="recent">
                        <p className='recent-title'>Recent</p>
                        {prevprompts.length > 0 ? prevprompts.map((item, index) => (
                            <div key={index} onClick={() => loadprompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        )) : null}
                    </div>
                ) : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {ext ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {ext ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {ext ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
