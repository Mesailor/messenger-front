import Chat from "../components/Chat"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ChatWindow() {
    const [value, setValue] = useState('')
    const [messages, setMessages] = useState([])


    const [chat, setChat] = useState('');

    const [subscribeActiovator, setSubscribeActiovator] = useState(1); //subAct-or
    const { id } = useParams();

    useEffect(() => {

        async function fetchChat() {
            if (!id) {
                return // КОСТЫЛЬ???
            }
            const response = await fetch(`http://${import.meta.env.VITE_BACKHOST}/chats/${id}`, {
                headers: { "X-Auth-Token": localStorage.getItem('token') }
            })
            const chat = await response.json();

            if (!chat.messages) {
                return
            }
            setChat(chat);
            setMessages(chat.messages);
        }
        fetchChat();


    }, [])

    useEffect(() => {
        try {
            subscribe();
        } catch {
            setTimeout(() => {
                subscribe();
            }, 100)
        }
    }, [subscribeActiovator]); //subAct-or

    async function subscribe() {
        if (!id) {
            return // КОСТЫЛЬ???
        }
        const messResp = await fetch(`http://${import.meta.env.VITE_BACKHOST}/chats/${id}/getmessage`, {
            headers: { "X-Auth-Token": localStorage.getItem('token') }
        });
        const message = await messResp.json();

        function updateMessages() {
            let copyOfMessages = messages.map(elem => elem);
            copyOfMessages.push(message);
            return copyOfMessages;
        }
        setMessages(updateMessages());

        setSubscribeActiovator(-subscribeActiovator); //subAct-or
    }

    async function sendMessage(e) {

        const newMessage = {
            author: "It mustn't work!",
            text: value,
        }
        const reqBody = { message: newMessage };
        try {
            setValue('');

            if (!id) {
                return // КОСТЫЛЬ???
            }
            await fetch(`http://${import.meta.env.VITE_BACKHOST}/chats/${id}/newmessage`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": localStorage.getItem('token')
                },
                body: JSON.stringify(reqBody)
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='chat'>
            <div className='chat-window'>
                {!id ? "CHOOSE THE CHAT" : <Chat chat={chat} messages={messages} />}
            </div>
            <input className="chat-input"
                type="text"
                onChange={e => setValue(e.target.value)}
                value={value} />
            <br />
            <button className='chat-button' onClick={sendMessage}>Send</button>
        </div>
    )
}