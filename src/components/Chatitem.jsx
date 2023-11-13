import { Link } from 'react-router-dom'

export default function Chatitem(props) {

    return (
        <p>
            <a href={`/chats/${props.chat._id}`} className="chat-item" key={props.chat._id} >{props.chat.name}</a>
        </p>
    )
}