import './App.scss';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import NavBar from './components/NavBar';
import Closet from './pages/closet/ClosetMain';
import Search from './pages/search/SearchMain';
import Profile from './pages/profile/ProfileMain';
import MakeOutfit from './pages/closet/MakeOutfit';
import Login from './pages/login/LoginMain';
import { Header } from './display';
import { headerMapping } from './constants';

//firebase imports
import app from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";


function App() {
    const location = useLocation();

    //testing userLogin
    const auth = getAuth(app);
    const[user] = useAuthState(auth);

    //signInWithEmailAndPassword(auth, "test@email.com", "abc123");
    
    //uncomment to reveal login page

    const headerTitle = headerMapping[location.pathname || 'empty'];
    return (
        <div className="App">
            <Header>{headerTitle}</Header>
            <div className="routes">
                {/*user? */
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/closet" />}
                    />
                    <Route path="/closet/*" element={<Closet />} />
                    <Route path="/make-outfit" element={<MakeOutfit />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes> /*: <Login/>*/}
            </div>
            {/*user ? */
            <NavBar />  /*: <div></div>*/}
        </div>
    );
}

export default App;
