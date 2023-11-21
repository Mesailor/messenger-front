import { useEffect, useState } from "react";
import Useritem from "../components/Useritem";


export default function UsersList(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
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
        <div className='users-list '>
            <h3 className="list-title">USERS LIST</h3>
            <div>
                {users.map((user) => {
                    return (
                        <Useritem user={user} />
                    )
                })}
            </div>
        </div>
    )
}