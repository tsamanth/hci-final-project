
import React from 'react'
import { useEffect, useState } from "react";


//firebase imports
import app from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";

//testing login function
export default function Login(props) {
    const {
        user} = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);


    const userLogin = () => {
        signInWithEmailAndPassword(auth, email, password);
    }

    return (
        <div className="Login">
        <h4>
            Log in
        </h4>
        <div className="User">
        <input
            type="text"
            placeholder="test@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="Pass">
        <input
            type="password"
            placeholder="abc123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button className="btn" onClick={() => {userLogin()}}>Sign in</button>
    </div>
    )
}