import { useEffect, useState } from "react"
import Chatitem from "../components/Chatitem"
import CreateChat from "../components/UI/CreateChat/CreateChat"

export default function ChatsList(props) {
    const [chats, setChats] = useState([]);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fecthAllChats() {
            const chatsResp = await fetch(`http://${props.backend_host}/chats`, {
                headers: { "X-Auth-Token": localStorage.getItem('token') }
            });
            const chats = await chatsResp.json();
            setChats(chats);
        }
        fecthAllChats();

        async function fecthAllUsers() {
            const usersResp = await fetch(`http://${props.backend_host}/users`, {
                headers: { "X-Auth-Token": localStorage.getItem('token') }
            });
            const users = await usersResp.json();
            setUsers(users);
        }
        fecthAllUsers();
    }, []);

    return (
        <div className='chats-list'>
                    CHATS LIST
                    <div>
                        {chats.map((chat) => {
                            return (
                                <Chatitem chat={chat} />
                            )
                        })}
                        <br /><br />
                        {isCreatingChat ?
                            <CreateChat
                                backend_host={props.backend_host}
                                setChats={setChats}
                                setIsCreatingChat={setIsCreatingChat}
                                chats={chats}
                                users={users} /> :
                            <button className='new-chat-btn' onClick={() => setIsCreatingChat(true)}>
                                New Chat
                            </button>}
                    </div>
                </div>
    )
}