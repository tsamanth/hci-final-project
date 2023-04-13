import React from 'react';
import { Grid, Button } from '@mui/material';
import { borderBottom } from '@mui/system';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    IconButton,
    Modal,
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    FormControl,
    Checkbox,
    TextField,
} from '@mui/material';

import app from '../../firebase';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
} from 'firebase/auth';

export default function Profile(props) {
    const location = useLocation();
    const [tops, addtop] = useState([]);
    const [bottoms, addbot] = useState([]);
    const [total, addTotal] = useState(0);
    const [list, setList] = useState(window.fits);
    const [modalOpen, setModalOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [username, setUsername] = useState('STEM');
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const auth = getAuth(app);

    const url = 'https://hci-final-a1f8e-default-rtdb.firebaseio.com';
    const navigate = useNavigate();

    const deleteFit = index => {
        let copy = [...list];
        if (index >= 0) {
            copy.splice(index, 1);
            window.fits = copy;
            setList(copy);
        }
    };

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

    const handleTextFieldChange = e => {
        setNewUsername(e.target.value);
    };

    const handleUsernameChange = () => {
        setUsername(newUsername);
    }

    const showOutfits = () => {
        let fit = [];

        return (
            <>
                {window.fits.map((element, id) => {
                    return (
                        <div key={id}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    margin: '18px 10px',
                                }}
                            >
                                <div style={{ display: 'flex', width: '100%' }}>
                                    <h4 style={{ display: 'left' }}>
                                        Style {id + 1}
                                    </h4>
                                    <Button
                                        id={id}
                                        style={{
                                            marginLeft: '10px',
                                            marginTop: '18px',
                                            width: '10%',
                                            height: '40%',
                                        }}
                                        size="small"
                                        variant="outlined"
                                        onClick={() => {
                                            deleteFit(id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 2, sm: 3, md: 4 }}
                            >
                                <Grid item xs={3}>
                                    <div>
                                        <img
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            src={element[0]}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <img
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            src={element[1]}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <img
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            src={element[2]}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <img
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            src={element[3]}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <img
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            src={element[4]}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    );
                })}
            </>
        );
    };

    const modal = () => {
        return (
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h3"
                        sx={{ paddingBottom: '10px' }}
                    >
                        Edit Profile
                    </Typography>
                    <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                    >
                        <div className="edit-username">
                            <TextField
                                label="Username"
                                onChange={handleTextFieldChange}
                            />
                            <Button onClick={handleUsernameChange} variant="outlined">Sumbit</Button>
                        </div>
                    </FormControl>
                </Box>
            </Modal>
        );
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '10px 10px',
                    borderBottom: '1px solid grey',
                }}
            >
                <div>
                    <img
                        style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '80px',
                        }}
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    />
                </div>
                <div style={{ margin: '10px' }}>
                    <h3>{username}</h3>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <h4 style={{ display: 'center', margin: '0px 50px' }}>
                            {window.fits.length} posts
                        </h4>
                    </div>
                    <div style={{ margin: '10px' }}>
                        <Button
                            onClick={handleModalOpen}
                            size="small"
                            variant="outlined"
                        >
                            Edit Profile
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                                auth.signOut();
                            }}
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>
            <div>{showOutfits()}</div>
            {modal()}
        </div>
    );
}
