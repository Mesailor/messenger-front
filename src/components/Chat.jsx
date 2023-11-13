import Message from "./Message"

export default function Chat(props) {

    return (
        <div className='chat-component' key={props.chat._id}>
            {props.messages.map((mess) => {
                return (
                    <Message mess={mess} />
                )
            })}
        </div>
    )
}