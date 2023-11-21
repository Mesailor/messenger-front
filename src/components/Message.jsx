

export default function Message(props) {

    return (
        <div className="message" key={props.mess._id}>
            <p className="message-author">{props.mess.author}</p>
            <p className="message-text">{props.mess.text}</p>
        </div>
    )
}