import React from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal, Box, Typography, FormControl, TextField } from '@mui/material';
import { buttonStyle } from '../../display';
import PropTypes from 'prop-types';
import { db } from '../../firebase';
import { update, ref } from 'firebase/database';

import app from '../../firebase';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
} from 'firebase/auth';

import {
    getStorage,
    ref as sRef,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';

export default function Profile(props) {
    const databaseURL = 'https://hci-final-a1f8e-default-rtdb.firebaseio.com/';

    const [list, setList] = useState(window.fits);
    const [modalOpen, setModalOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const auth = getAuth(app);
    const storage = getStorage(app);

    const navigate = useNavigate();

    const deleteFit = index => {
        let copy = [...list];
        if (index >= 0) {
            copy.splice(index, 1);
            window.fits = copy;

            //update firebase to reflect change
            fetch(`${databaseURL + `/users/${props.userId}/saved`}/.json`, {
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
        if (newUsername && newUsername.length > 0) {
            const updates = {
                username: newUsername,
            };
            update(ref(db, 'users/' + props.userId), updates);
        }
    };

    const handleNewProfilePicture = e => {
        const file = e.target.files[0];
        const imgUrl = URL.createObjectURL(file);

        const metadata = {
            contentType: 'image/jpeg',
        };

        const storageRef = sRef(storage, `images/${props.userId}/` + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
            'state_changed',
            snapshot => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            error => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    const updates = {
                        profile_picture: downloadURL,
                    };

                    fetch(
                        `${
                            databaseURL +
                            `users/${props.userId}/profile_picture`
                        }/.json`,
                        {
                            method: 'PUT',
                            body: JSON.stringify(downloadURL),
                        }
                    ).then(res => {
                        if (res.status !== 200) {
                            alert('Save Error');
                        } else {
                            return;
                        }
                    });
                });
            }
        );

        //update(ref(db, 'users/' + props.userId), updates);
        handleModalClose();
    };

    const showOutfits = () => {
        let fit = [];

        return (
            <>
                {window.fits.map((element, id) => {
                    return (
                        <div className="saved-outfit" key={id}>
                            <div className="style-title">
                                <div className="items">
                                    <h4>Style {id + 1}</h4>
                                    <Button
                                        id={id}
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
                                className="outfit-grid"
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 2, sm: 3, md: 4 }}
                            >
                                <Grid item xs={3}>
                                    <div>
                                        <img src={element[0]} />
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <img src={element[1]} />
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <img src={element[2]} />
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <img src={element[3]} />
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        <img src={element[4]} />
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
                        className="edit-profile"
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                    >
                        <div className="edit-username">
                            <TextField
                                label="Username"
                                onChange={handleTextFieldChange}
                            />
                            <Button
                                className="submit-button"
                                onClick={handleUsernameChange}
                                variant="contained"
                                sx={buttonStyle}
                            >
                                Done
                            </Button>
                        </div>
                        <Button
                            variant="contained"
                            sx={buttonStyle}
                            component="label"
                        >
                            Upload Profile Picture
                            <input
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                                onChange={handleNewProfilePicture}
                            />
                        </Button>
                    </FormControl>
                </Box>
            </Modal>
        );
    };

    return (
        <div className="profile">
            <div className="header">
                <div>
                    <img className="profile-img" src={props.profilePicture} />
                </div>
                <div className="info">
                    <h3>{props.username}</h3>
                    <div className="num-posts">
                        <h4>{window.fits.length} posts</h4>
                    </div>
                    <div className="button-container">
                        <Button
                            onClick={handleModalOpen}
                            size="small"
                            variant="contained"
                            sx={buttonStyle}
                        >
                            Edit Profile
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            sx={buttonStyle}
                            onClick={() => {
                                auth.signOut();
                                navigate('/login');
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

Profile.propTypes = {
    profilePicture: PropTypes.string,
    username: PropTypes.string,
    userId: PropTypes.string,
};
