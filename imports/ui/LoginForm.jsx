import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [passowrd, setPassword] = useState('');
    const submit = e => {
        e.preventDefault();
        Meteor.loginWithPassword(username, passowrd);
    }
    return (
        <form onSubmit={submit} className="login-form">
            <label htmlFor="username">Username </label>
            <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Password </label>
            <input
                type="text"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log In</button>
        </form>
    )
}