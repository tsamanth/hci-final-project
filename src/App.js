import './App.scss';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Closet from './pages/closet/ClosetMain';
import Search from './pages/search/SearchMain';
import Profile from './pages/profile/ProfileMain';
import MakeOutfit from './pages/closet/MakeOutfit';
import { Header } from './display';
import { headerMapping } from './constants';

//firebase imports
import app from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";


function App() {
    const location = useLocation();

    const headerTitle = headerMapping[location.pathname || 'empty'];
    return (
        <div className="App">
            <Header>{headerTitle}</Header>
            <div className="routes">
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/closet" />}
                    />
                    <Route path="/closet/*" element={<Closet />} />
                    <Route path="/make-outfit" element={<MakeOutfit />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
            <NavBar />
        </div>
    );
}

export default App;
