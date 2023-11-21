import { Link, Outlet } from 'react-router-dom'
import '../styles/mainpage.css'

export default function Mainpage(props) {


    return (
        <>
            <header>
                <div className="logo-frame">
                    <img className="mini-logo" src="https://upload.wikimedia.org/wikipedia/ru/f/f9/Philadelphia_Eagles_primary_logo.png" alt="My Messenger" />
                </div>
                <nav>
                    <Link className='nav-link' to="/users" >Contacts</Link>
                    <Link className='nav-link' to="/" >Chats</Link>
                </nav>
            </header>
            <div className='main-container'>
                <Outlet />
            </div>
        </>
    )
}