import './App.scss';
import {
    Routes,
    Route,
    Navigate,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Closet from './pages/closet/ClosetMain';
import Profile from './pages/profile/ProfileMain';
import Login from './pages/login/LoginMain';
import { Header } from './display';
import { headerMapping } from './constants';
import { createTheme, ThemeProvider } from '@mui/material';
import { Theme } from './colorConstants';
import { initalCloset } from './pages/closet/constants';

//firebase imports
import app from './firebase';
import { ref, onValue, get, set } from 'firebase/database';
import { db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
} from 'firebase/auth';

const theme = createTheme({
    palette: {
        primary: {
            main: Theme.pink,
        },
        secondary: {
            main: Theme.grey,
        },
    },
    typography: {
        fontFamily: 'Cabin',
    },
});

window.fits = [];

function App() {
    const location = useLocation();

    
    //testing userLogin
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
    const [modOutfit, setModOutfit] = useState(false);
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        userid: '',
        username: '',
        closet: initalCloset,
        profile_picture:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    });

    useEffect(() => {
        if (user) {
            navigate('/');
            const userid = user.email.split('@')[0];
            const userProf = ref(db, 'users/' + userid);

            onValue(userProf, snapshot => {
                const data = snapshot.val();
                setUserData(data);
                if (!data) {
                    setUserData({
                        userid: userid,
                        username: userid,
                        closet: initalCloset,
                        profile_picture:
                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                    });
                    set(ref(db, 'users/' + userid), {
                        userid: userid,
                        username: userid,
                        closet: initalCloset,
                        profile_picture:
                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                    });
                }
            });
        }
    }, [user]);

    //signInWithEmailAndPassword(auth, "test@email.com", "abc123");

    const headerTitle = headerMapping[location.pathname || 'empty'];
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Header>{headerTitle}</Header>
                
                <div className="routes">
                    <Routes>
                    {!user ? (
                        <Route
                            path="/"
                            element={<Navigate replace to="/login" />}
                        />
                       
                    ) : ( <Route
                            path="/"
                            element={<Navigate replace to="/closet" />}
                        />) }
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/closet/*"
                            element={
                                <Closet
                                    modOutfit={modOutfit}
                                    setModOutfit={setModOutfit}
                                    closetData={userData.closet}
                                    userId={userData.userid}
                                />
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <Profile
                                    profilePicture={userData.profile_picture}
                                    username={userData.username}
                                    userId={userData.userid}
                                />
                            }
                        />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>

                {user && <NavBar setModOutfit={setModOutfit} />}
            </ThemeProvider>
        </div>
    );
}

export default App;
