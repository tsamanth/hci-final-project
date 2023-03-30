import './App.scss';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Closet from './pages/closet/ClosetMain';
import Search from './pages/search/SearchMain';
import Explore from './pages/explore/ExploreMain';
import Profile from './pages/profile/ProfileMain';
import AddPost from './pages/add-post/AddPostMain';
import { Header } from './display';

function App() {
    const location = useLocation();
    return (
        <div className="App">
            <Header>{location.pathname}</Header>
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/closet" />}
                    />
                    <Route path="/closet" element={<Closet />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/add" element={<AddPost />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
            <NavBar />
        </div>
    );
}

export default App;
