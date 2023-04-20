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
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           
            //load in saved outfits 
            const databaseURL = 'https://hci-final-a1f8e-default-rtdb.firebaseio.com/';
            const userid = email.split('@')[0];
            if(userid){
                fetch(`${databaseURL + `users/${userid}/saved`}/.json`)
                    .then((res) => {
                        console.log(res);
                        if (res.status !== 200) {
                        //alert("error getting list");
                        } else {
                            //alert("data retrieved!");
                        return res.json();
                        }
                    })
                    .then((res) => {
                        if(res){
                            window.fits = res;
                        } else 
                            window.fits = [];
                        }
                    );
            } 
            
            // Signed in 
            //navigate('/closet/make-outfit');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message);
        });
        
        //signInWithEmailAndPassword(auth, email, password);

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
