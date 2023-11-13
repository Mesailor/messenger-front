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

    return (
        <>
            <Routes>
                <Route path="/reg" element={<Regpage />} />
                <Route path="/auth" element={<Authpage />} />


                <Route path='/' element={<Mainpage />}>
                    {/* <Route path="/chats" element={<ChatWindow />} /> */}
                    <Route path="/chats/:id" element={<ChatWindow />} />
                    <Route path="/users" element={<UsersList />} />
                    <Route index element={<ChatsList />} />
                </Route>
            </Routes>
        </>
    )
}