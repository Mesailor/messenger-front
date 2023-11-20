import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import '../styles/Authpage.css'

export default function Authpage(props) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [result, setResult] = useState('')
    const navigate = useNavigate();

    async function sendUser() {
        const user = {
            name: name.toLowerCase(),
            password
        }

        try {
            let response = await fetch(`http://${props.backend_host}/auth`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            let body = await response.json();

            if (!body.token) {
                return setResult(body.text);
            }
            localStorage.setItem('token', body.token);
            navigate('/');
        } catch (e) {
            return console.log(e);
        }
    }

    return (
        <div className='auth-container'>
            <img className='logo' src="https://upload.wikimedia.org/wikipedia/ru/f/f9/Philadelphia_Eagles_primary_logo.png" alt="Logo" />
            <h1 className='title'>My Messenger</h1>
            <p>Please enter your name and password</p>

            <div>{result}</div>
            <div className="input-container">
                <input
                    className='auth-input'
                    type='text'
                    placeholder='name'
                    value={name}
                    onChange={e => setName(e.target.value)}></input><br />
                <input
                    className='auth-input'
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}></input>
            </div>

            <button to='/main' onClick={sendUser}>Start chating</button> <br />
            <p>Dont have an account yet? <Link to="/reg">Registration</Link></p>
        </div>
    )
}