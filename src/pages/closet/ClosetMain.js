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
import ViewPage from './ViewPage';
import TuneIcon from '@mui/icons-material/Tune';
import { emptyItems, allCatagories, blankSquare } from './constants';
import PropTypes from 'prop-types';
import { modalStyle } from '../../display';

import app from '../../firebase';
import { ref, onValue, get, set } from 'firebase/database';
import { db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
} from 'firebase/auth';


export default function Closet(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [items, setItems] = useState(emptyItems);
    const { setModOutfit, modOutfit, userId, closetData } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const auth = getAuth(app);


    const databaseURL = 'https://hci-final-a1f8e-default-rtdb.firebaseio.com/';
    //alert(window.fits);
    //alert(props.userId);
    fetch(`${databaseURL + `users/${props.userId}/saved`}/.json`)
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

            <TuneIcon
                onClick={() => {
                    if (location.pathname === '/closet/make-outfit') {
                        handleModalOpen();
                    } else {
                        setEditMode(!editMode);
                    }
                }}
                className="edit-button"
                aria-label="edit"
            />
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-edit-cats"
            >
                <Box sx={modalStyle}>
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
                                return i.type.toLowerCase() === c;
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
                                
                                fetch(`${databaseURL + `users/${props.userId}/saved`}/.json`, {
                                    method: "PUT",
                                    body: JSON.stringify(window.fits)
                                    }).then((res) => {
                                    if (res.status !== 200) {
                                        alert("Save Error");
                                    } else {
                                        //alert("List Saved!");
                                        return;
                                    }
                                    });
                            }}
                        />
                    }
                />
                {allCatagories.map(c => {
                    return (
                        <Route
                            path={`/${c}`}
                            element={
                                <ViewPage
                                    type={c}
                                    handleClick={handleClickOutfit}
                                    images={
                                        closetData &&
                                        closetData.hasOwnProperty(c)
                                            ? closetData[c]
                                            : []
                                    }
                                    modOutfitOn={modOutfit}
                                    userId={userId}
                                    editMode={editMode}
                                />
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

Closet.propTypes = {
    setModOutfit: PropTypes.func,
    modOutfit: PropTypes.bool,
    userId: PropTypes.string,
    closetData: PropTypes.object,
};
