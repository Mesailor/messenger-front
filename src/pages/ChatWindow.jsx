import Message from "../components/Message"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../styles/ChatWindow.css"

export default function ChatWindow(props) {
    const [value, setValue] = useState('')
    const [messages, setMessages] = useState([])


    const [chat, setChat] = useState('');

    const [subscribeActiovator, setSubscribeActiovator] = useState(1); //subAct-or
    const { id } = useParams();

    const [sessionUser, setSessionUser] = useState(atob(localStorage.getItem("token").split('.')[1]))

    useEffect(() => {

        async function fetchChat() {
            if (!id) {
                return // КОСТЫЛЬ???
            }
            const response = await fetch(`http://${props.backend_host}/chats/${id}`, {
                headers: { "X-Auth-Token": localStorage.getItem('token') }
            })
            const chat = await response.json();

            if (!chat.messages) {
                return
            }
            setChat(chat);
            setMessages(chat.messages.reverse());
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
        const messResp = await fetch(`http://${props.backend_host}/chats/${id}/getmessage`, {
            headers: { "X-Auth-Token": localStorage.getItem('token') }
        });
        const message = await messResp.json();

        function updateMessages() {
            let copyOfMessages = messages.map(elem => elem);
            copyOfMessages.unshift(message);
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
            await fetch(`http://${props.backend_host}/chats/${id}/newmessage`, {
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
            <div className='chat-window' key={chat._id}>
                {messages.map((mess) => {
                    function setMyMessage() {
                        if (mess.author === JSON.parse(sessionUser).name) {
                            return {paddingLeft: "30%", paddingRight: "0"}
                        }
                    }
                    return (
                        <div className="message-box" style={setMyMessage()}>
                            <Message mess={mess} />
                        </div>
                    )
                })}
            </div>
            <input className="chat-input"
                type="text"
                placeholder="Message"
                onChange={e => setValue(e.target.value)}
                value={value} />
            <button className='send-mess-btn' onClick={sendMessage}>Send</button>
        </div>
    )
}