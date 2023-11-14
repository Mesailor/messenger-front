import { useState, useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'

export default function Regpage() {
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
            let result = await fetch(`http://${import.meta.env.VITE_BACKHOST}/users`, {
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
        <div>
            <h1>Registration page</h1>
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

            <button onClick={sendUser}>Create user</button><br />
            <div>{result}</div>
        </div>
    )
}