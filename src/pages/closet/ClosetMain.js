import Sidebar from './Sidebar';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route } from 'react-router-dom';
import MakeOutfit from './MakeOutfit';
import Tops from './Tops';
import Bottoms from './Bottoms';
import { useNavigate } from 'react-router-dom';

export default function Closet() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = text => {
        const lowerText = text.toLowerCase();
        if (text === 'Closet') {
            navigate(`/`);
        } else {
            navigate(`/closet/${lowerText}`);
        }
        setSidebarOpen(false);
    };
    return (
        <div className="closet page">
            <IconButton
                className="sidebar-button"
                aria-label="menu"
                onClick={() => setSidebarOpen(true)}
            >
                <MenuIcon />
            </IconButton>
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleClick={handleClick}
            />
            <Routes>
                <Route path="/" element={<MakeOutfit />} />
                <Route path="/tops" element={<Tops />} />
                <Route path="/bottoms" element={<Bottoms />} />
            </Routes>
        </div>
    );
}
