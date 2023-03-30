import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route } from 'react-router-dom';
import MakeOutfit from './MakeOutfit';
import { useNavigate } from 'react-router-dom';
import { bottomsImages, topImages } from './DummyData';
import ViewPage from './ViewPage';

const emptyItems = [
    {
        type: 'Tops',
        url: 'https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg',
    },
    {
        type: 'Bottoms',
        url: 'https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg',
    },
];

export default function Closet() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modOutfit, setModOutfit] = useState(false);
    const [items, setItems] = useState(emptyItems);
    const navigate = useNavigate();
    const handleClickNav = (text, modOutfit) => {
        if (modOutfit) setModOutfit(modOutfit);
        const lowerText = text.toLowerCase();
        if (text === 'Closet') {
            navigate(`/`);
        } else {
            navigate(`/closet/${lowerText}`);
        }
        setSidebarOpen(false);
    };
    const handleClickOutfit = (newUrl, type) => {
        if (modOutfit) {
            const updatedItems = items.map(item => {
                if (item.type.toLowerCase() === type) {
                    return { ...item, url: newUrl };
                } else {
                    return item;
                }
            });
            setItems(updatedItems);
            setModOutfit(false);
        }
    };

    useEffect(() => {
        navigate(`/closet`);
    }, [items]);
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
                handleClick={handleClickNav}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <MakeOutfit
                            handleItemClick={handleClickNav}
                            items={items}
                            redo={() => setItems(emptyItems)}
                        />
                    }
                />
                <Route
                    path="/tops"
                    element={
                        <ViewPage
                            type="tops"
                            handleClick={handleClickOutfit}
                            images={topImages}
                        />
                    }
                />
                <Route
                    path="/bottoms"
                    element={
                        <ViewPage
                            type="bottoms"
                            handleClick={handleClickOutfit}
                            images={bottomsImages}
                        />
                    }
                />
            </Routes>
        </div>
    );
}
