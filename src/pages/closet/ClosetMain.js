import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import {
    IconButton,
    Modal,
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import MakeOutfit from './MakeOutfit';
import { useNavigate } from 'react-router-dom';
import {
    bottomsImages,
    topImages,
    jewelryImages,
    otherImages,
    shoeImages,
} from './DummyData';
import ViewPage from './ViewPage';
import TuneIcon from '@mui/icons-material/Tune';
import { emptyItems, allCatagories, blankSquare } from './constants';
import { Category } from '@mui/icons-material';

window.fits = [];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Closet() {
    const [modalOpen, setModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modOutfit, setModOutfit] = useState(false);
    const [items, setItems] = useState(emptyItems);

    const [top, setTop] = useState(false);
    const [bottom, setBottom] = useState(false);

    const url = 'https://hci-final-a1f8e-default-rtdb.firebaseio.com';
    const navigate = useNavigate();
    const location = useLocation();

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const handleModalChange = e => {
        // we want to change the items in {items}
        const checked = e.target.checked;
        const label = e.target.value;
        if (checked) {
            let newItems = [].concat(items, [
                { type: label, url: blankSquare },
            ]);
            setItems(newItems);
        } else {
            setItems(
                items.filter(i => {
                    return i.type != label;
                })
            );
        }
    };
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
                    if (type === 'tops') {
                        setTop(newUrl);
                    }
                    if (type === 'bottoms') {
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
            {location.pathname !== '/closet/make-outfit' && (
                <IconButton
                    className="sidebar-button"
                    aria-label="menu"
                    onClick={() => setSidebarOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
            )}
            {location.pathname === '/closet/make-outfit' && (
                <TuneIcon
                    onClick={() => {
                        console.log('ah');
                        handleModalOpen();
                    }}
                    className="edit-button"
                    aria-label="edit"
                />
            )}
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-edit-cats"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Edit Catagories
                    </Typography>
                    <FormGroup>
                        {allCatagories.map(c => {
                            const filteredItems = items.filter(i => {
                                return i.type === c;
                            });
                            const checked = filteredItems.length > 0;
                            return (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            defaultChecked={checked}
                                            onChange={handleModalChange}
                                            value={c}
                                        />
                                    }
                                    label={c}
                                />
                            );
                        })}
                    </FormGroup>
                </Box>
            </Modal>
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
                                var urls = [];
                                items.forEach(element => {
                                    urls.push(element.url);
                                });
                                window.fits.length
                                    ? (window.fits = [...window.fits, urls])
                                    : (window.fits = [urls]);
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
                <Route
                    path="/jewelry"
                    element={
                        <ViewPage
                            type="jewelry"
                            handleClick={handleClickOutfit}
                            images={jewelryImages}
                        />
                    }
                />
                <Route
                    path="/other"
                    element={
                        <ViewPage
                            type="other"
                            handleClick={handleClickOutfit}
                            images={otherImages}
                        />
                    }
                />
                <Route
                    path="/shoes"
                    element={
                        <ViewPage
                            type="shoes"
                            handleClick={handleClickOutfit}
                            images={shoeImages}
                        />
                    }
                />
            </Routes>
        </div>
    );
}
