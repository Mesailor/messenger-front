import './CreateChat.css'
import { useState } from 'react'

export default function CreateChat(props) {
    const [chatName, setName] = useState('');
    const [usernames, setUsernames] = useState([]);
    const [userIds, setUserIds] = useState([]);

    function addUser(username) {
        if (usernames.includes(username)) {
            return
        }
        let copyUsernames = usernames.slice();
        copyUsernames.push(username);
        setUsernames(copyUsernames);

        let userId;
        props.users.forEach(user => {
            if (user.name === username) {
                userId = user._id;
            }
        });

        let copyUserIds = userIds.slice();
        copyUserIds.push(userId);
        setUserIds(copyUserIds);
    }

    function deleteUser(username) {
        let copyUsernames = usernames.slice();
        copyUsernames.splice(copyUsernames.indexOf(username), 1);
        setUsernames(copyUsernames);

        let userId;
        props.users.forEach(user => {
            if (user.name === username) {
                userId = user._id;
            }
        });

        let copyUserIds = userIds.slice();
        copyUserIds.splice(copyUserIds.indexOf(userId));
        setUserIds(copyUserIds);
    }

    async function sendChat() {
        const newChat = {
            name: chatName,
            users: userIds
        }
        const reqBody = { chat: newChat }

        try {
            const response = await fetch(`http://${props.backend_host}/chats`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": localStorage.getItem('token')
                },
                body: JSON.stringify(reqBody)
            });
            var createdChat = await response.json();
            if (!createdChat.name) {
                return alert(createdChat.text);
            }
        } catch (e) {
            return console.log(e);
        }

        let copyChats = props.chats.slice();
        copyChats.push(createdChat);
        props.setChats(copyChats);

        props.setIsCreatingChat(false);
    }

    return (
        <div className="create-block">
            <input
                className='chatname-input'
                type="text"
                placeholder="chat name"
                value={chatName}
                onChange={e => setName(e.target.value)} />
            <p>Select members of new chat:</p>
            <div className='chosen-users'>
                {usernames.map(user => {
                    return (
                        <input className='chosen-user' key={user} type="button" value={user} onClick={e => deleteUser(e.target.value)} />
                    )
                })}
            </div>
            <select className="users-select" size={5} multiple>
                {props.users.map(user => {
                    if (usernames.includes(user.name)) {
                        return
                    }
                    return (
                        <option value={user.name} onClick={e => {
                            addUser(e.target.value)
                        }} key={user._id} >{user.name}</option>
                    )
                })}
            </select>
            <br />
            <button onClick={sendChat} className="new-chat-btn">Create Chat</button>
        </div>
    )
}