import React from 'react';
import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { buttonStyle } from '../../display';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';

//firebase imports
import app from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
} from 'firebase/auth';

//testing login function
export default function Login(props) {
    const { user } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);
    const navigate = useNavigate();

    const userLogin = () => {
        signInWithEmailAndPassword(auth, email, password);
        navigate('/closet/make-outfit');
    };

    return (
        <div className="login-page">
            <img src={logo} />
            <div className="user">
                <TextField
                    label="Username"
                    placeholder="test@email.com"
                    color="secondary"
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="pass">
                <TextField
                    label="Password"
                    type="password"
                    placeholder="abc123"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <Button
                className="btn"
                sx={buttonStyle}
                variant="contained"
                color="secondary"
                onClick={() => {
                    userLogin();
                }}
            >
                Sign in
            </Button>
        </div>
    );
}
