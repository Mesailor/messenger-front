import { useState, useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import '../styles/Authpage.css'

export default function Regpage(props) {
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
            let result = await fetch(`http://${props.backend_host}/users`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });
            result = await result.json();
            if (!result.token) {
                return setResult(result.text);
            }
            localStorage.setItem('token', result.token);
        } catch (e) {
            return console.log(e);
        }
        navigate('/');
    }

    return (
        <div className='auth-container'>
            <img className='logo' src="https://upload.wikimedia.org/wikipedia/ru/f/f9/Philadelphia_Eagles_primary_logo.png" alt="Logo" />
            <h1 className='title'>My Messenger</h1>
            <p>Create your account</p>
            <div className='input-container'>
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
                    onChange={e => setPassword(e.target.value)}></input><br />

            <input type="checkbox" /> <span>Keep me signed in</span> <br />
            </div>
            <button onClick={sendUser}>Create account</button><br />
            <div>{result}</div>
        </div>
    )
}