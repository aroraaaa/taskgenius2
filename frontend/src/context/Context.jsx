import { createContext, useState } from "react";
import run from "../config/api";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentprompt, setRecentprompt] = useState("");
    const [prevprompts, setPrevprompts] = useState([]);
    const [showresult, setShowresult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultdata, setResultdata] = useState("");

    const delay = (index, nextword) => {
        setTimeout(() => {
            setResultdata(prev => prev + nextword);
        }, 75 * index);
    }

    const newchat = () => {
        setLoading(false);
        setShowresult(false);
        setInput("");
        setResultdata("");
    }

    const onSent = async (prompt, isNew = true) => {
        setResultdata("");
        setLoading(true);
        setShowresult(true);

        let currentPrompt = prompt !== undefined ? prompt : input;
        if (!currentPrompt) return;

        setRecentprompt(currentPrompt);

        if (isNew) {
            setPrevprompts(prev => [...prev, currentPrompt]);
        }

        try {
            const response = await run(currentPrompt);
            let responseArray = response.split("**");
            let newResponse = "";

            for (let i = 0; i < responseArray.length; i++) {
                if (i % 2 === 0) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            let newResponse2 = newResponse.split("*").join("</br>");
            let newResponsearray = newResponse2.split(" ");

            for (let i = 0; i < newResponsearray.length; i++) {
                const nextword = newResponsearray[i];
                delay(i, nextword + " ");
            }
        } catch (error) {
            console.error("Error sending prompt:", error);
        } finally {
            setLoading(false);
            setInput("");
        }
    }

    const contextValue = {
        prevprompts,
        setPrevprompts,
        onSent,
        setRecentprompt,
        recentprompt,
        showresult,
        loading,
        resultdata,
        input,
        setInput,
        newchat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;
