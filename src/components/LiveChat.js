import { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'

import { addMessage } from '../utils/chatSlice'
import { getRandomName, getRandomSentence } from '../utils/helper';

const LiveChat = () => {
    const dispatch = useDispatch();

    const chatMessages = useSelector(store => store.chat.messages)

    useEffect(() => {
        const i = setInterval(() => {
            // API polling
            dispatch(addMessage({
                name: getRandomName(),
                text: getRandomSentence()
            }))
        }, 2000)

        return () => clearInterval(i);
    },[dispatch])

    const [liveMessage, setLiveMessage] = useState("")

    function handleSubmit(e) {
        e.preventDefault();

        if (!liveMessage.length || liveMessage.length > 150) return;
        dispatch(addMessage({
            name: "Vaibhav Madan",
            text: liveMessage
        }))
        setLiveMessage("");
    }
    return (
        <div className="w-96 max-w-96">
            <div className="overflow-y-scroll ml-2 h-[400px] border border-black border-solid bg-slate-100 flex flex-col-reverse">
                <div>
                    {chatMessages.map(c => <ChatMessage name={c.name} message={c.text} />)}
                </div>
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <input value={liveMessage} onChange={e => setLiveMessage(e.target.value)} className="ml-2 mt-2 border border-black w-2/3" />
                <button className="border border-black bg-green-300 px-2">Send</button>
            </form>
        </div>
    )
}

export default LiveChat