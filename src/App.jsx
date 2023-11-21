import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from 'react-router-dom'

import Regpage from './pages/Regpage'
import Authpage from './pages/Authpage'
import Mainpage from './pages/Mainpage'
import ChatWindow from './pages/ChatWindow'
import UsersList from './pages/UsersList'
import ChatsList from './pages/ChatsList'

export default function App() {
    const backend_host = import.meta.env.VITE_BACKHOST;

    return (
        <>
            <Routes>
                <Route path="/reg" element={<Regpage backend_host={backend_host} />} />
                <Route path="/auth" element={<Authpage backend_host={backend_host} />} />
                <Route path='/' element={<Mainpage />}>
                    <Route path="/chats/:id" element={<ChatWindow backend_host={backend_host} />} />
                    <Route path="/users" element={<UsersList backend_host={backend_host} />} />
                    <Route index element={<ChatsList backend_host={backend_host} />} />
                </Route>
            </Routes>
        </>
    )
}