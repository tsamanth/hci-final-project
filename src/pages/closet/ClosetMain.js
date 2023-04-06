import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import MakeOutfit from './MakeOutfit';
import { useNavigate } from 'react-router-dom';
import { bottomsImages, topImages } from './DummyData';
import ViewPage from './ViewPage';
import TuneIcon from '@mui/icons-material/Tune';

window.fits = [];

const emptyItems = [
    {
        type: 'Tops',
        url: 'https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg',
    },
    {
        type: 'Bottoms',
        url: 'https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg',
    },
    {
        type: 'Jewelry',
        url: 'https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg',
    },
    {
        type: 'Other',
        url: 'https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg',
    },
    {
        type: 'Shoes',
        url: 'https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg',
    },
];

export default function Closet() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modOutfit, setModOutfit] = useState(false);
    const [items, setItems] = useState(emptyItems);

    const [top, setTop] = useState(false);
    const [bottom, setBottom] = useState(false);
    const [currOutfit, setOutfit] = useState([]);

    const url = "https://hci-final-a1f8e-default-rtdb.firebaseio.com";
    const navigate = useNavigate();
    const location = useLocation();
    const handleClickNav = (text, modOutfit) => {
        if (modOutfit) setModOutfit(modOutfit);
        const lowerText = text.toLowerCase();
        navigate(`/closet/${lowerText}`);
        setSidebarOpen(false);
    };

    const handleClickOutfit = (newUrl, type) => {
        if (modOutfit) {
            const updatedItems = items.map(item => {
                if (item.type.toLowerCase() === type) {
                    if(type === "tops"){
                        setTop(newUrl);
                    }
                    if(type === "bottoms"){
                        setBottom(newUrl);
                    }
                    return { ...item, url: newUrl };
                } else {
                    return item;
                }
            });
            setItems(updatedItems);
            setModOutfit(false);
        }
    };
 
    /*
    const savedOutfit = (top, bottom) =>{
        let path = '/profile'
        setOutfit([...currOutfit, [top, bottom]])
        navigate(path, {replace: true, state: {currOutfit: currOutfit}});
    }*/

    useEffect(() => {
        navigate(`/closet/make-outfit`);
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
            {location.pathname === '/closet/make-outfit' && (
                <TuneIcon className="edit-button" aria-label="edit" />
            )}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleClick={handleClickNav}
            />

            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Navigate replace to="/closet/tops" />}
                />
                <Route
                    path="/make-outfit"
                    element={
                        <MakeOutfit
                            handleItemClick={handleClickNav}
                            items={items}
                            redo={() => setItems(emptyItems)}
                            save={() => {
                                
                                window.fits.length ? window.fits = ([...window.fits, [top,bottom]]): window.fits = ([[top,bottom]]);
                                //alert(window.fits);
                                /*currOutfit.length ? setOutfit([...currOutfit, [top,bottom]]): setOutfit([top,bottom]*);*/
                                //navigate('/profile', {replace: true, state: {currOutfit: currOutfit, top: top, bottom: bottom}});
                            }}
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
