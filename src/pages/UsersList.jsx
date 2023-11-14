import { useEffect, useState } from "react";
import Useritem from "../components/Useritem";


export default function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fecthAllUsers() {
            const usersResp = await fetch(`http://${import.meta.env.VITE_BACKHOST}/users`, {
                headers: { "X-Auth-Token": localStorage.getItem('token') }
            });
            const users = await usersResp.json();
            setUsers(users);
        }
        fecthAllUsers();
    }, []);

    return (
        <div className='users-list '>
            USERS LIST
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