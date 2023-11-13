import { Link, Outlet } from 'react-router-dom'
import '../styles/mainpage.css'

export default function Mainpage(props) {


    return (
        <>
            <header>
                {/* <Link to="/chats" >Chat</Link> */}
                <Link className='link' to="/users" >Users</Link>
                <Link className='link' to="/" >Chats</Link>
            </header>
            <div className='container'>
                <Outlet />
            </div>
        </>
    )
}