import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"

export default function Authpage() {
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
            let response = await fetch('http://193.233.232.74:5000/auth', {
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
        <div>
            <h1>Auth page</h1>
            <div>{result}</div>
            <input
                type='text'
                placeholder='name'
                value={name}
                onChange={e => setName(e.target.value)}></input><br />
            <input
                type='password'
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.target.value)}></input><br />

            <button to='/main' onClick={sendUser}>Join chat</button><br /><br />
            <p>New here? <Link to="/reg">Registration</Link></p>
        </div>
    )
}