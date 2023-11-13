

export default function Useritem(props) {

    return (
        <div className="user-item" key={props.user._id}>{props.user.name}</div>
    )
}