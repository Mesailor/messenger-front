

export default function Message(props) {

    return (
        <div className="message" key={props.mess._id}>
            {props.mess.author}: {props.mess.text}
        </div>
    )
}