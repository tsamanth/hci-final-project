import PropTypes from 'prop-types';
import {
    Box,
    Grid,
    Paper,
    Modal,
    Typography,
    FormGroup,
    getImageListItemBarUtilityClass,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { modalStyle } from '../../display';
import { Button } from '@mui/material';
import { buttonStyle } from '../../display';
import { db } from '../../firebase';
import { update, ref } from 'firebase/database';
import { blankSquare } from './constants';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import app from '../../firebase';
import { getAuth } from 'firebase/auth';
import {
    getStorage,
    ref as sRef,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    maxWidth: '100%',
    height: '20vh',
    display: 'flex',
    justifyContent: 'center',
}));

export default function ViewPage(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const storage = getStorage(app);
    const auth = getAuth(app);
    const databaseURL = 'https://hci-final-a1f8e-default-rtdb.firebaseio.com/';

    const [imgList, setList] = useState([]);

    //alert(imagesRef);
    const uploadItem = e => {
        //uploading item
        const file = e.target.files[0];

        const metadata = {
            contentType: 'image/jpeg',
        };

        // Upload file and metadata to the object
        const storageRef = sRef(storage, `images/${props.userId}/` + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        let url = '';

        // Listen for state changes, errors, and completion of the upload.
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
                        [props.type]: [...props.images, downloadURL],
                    };

                    fetch(
                        `${
                            databaseURL +
                            `users/${props.userId}/closet/${props.type}`
                        }/.json`,
                        {
                            method: 'PUT',
                            body: JSON.stringify(updates[props.type]),
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
    };

    const removeItem = (url, type) => {
        const newImgs = props.images.filter(i => {
            //push new url into base
            return i != url;
        });
        const updates = {
            [props.type]: newImgs,
        };
        update(ref(db, `users/${props.userId}/closet`), updates);
    };
    if (props.images.length == 0) {
        props.setEditMode(false);
    }
    let listImages = props.modOutfitOn ? (
        <div className="no-items">
            {' '}
            there are currently no items in this section. to add {
                props.type
            }{' '}
            items, click on the closet page below and navigate to the{' '}
            <b>{props.type}</b> section using the sidebar.
        </div>
    ) : (
        <></>
    );
    if (props.images.length > 0 && Array.isArray(props.images)) {
        listImages = props.images.map(url => (
            <Grid item xs={4} key={url}>
                <Item
                    className="one-item"
                    onClick={() => props.handleClick(url, props.type)}
                >
                    {props.editMode && (
                        <CancelOutlinedIcon
                            className="delete-button"
                            onClick={() => removeItem(url, props.type)}
                        />
                    )}
                    <img src={url} />
                </Item>
            </Grid>
        ));
    }

    return (
        <>
            <Box className="view-page" sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {listImages}
                    {!props.modOutfitOn && (
                        <Grid item xs={4} justifyContent="top">
                            <Item onClick={handleModalOpen}>
                                <AddCircleOutlineIcon className="add-clothing-button" />
                            </Item>
                        </Grid>
                    )}
                    {props.modOutfitOn && (
                        <Grid item xs={4} justifyContent="top">
                            <Item
                                onClick={() =>
                                    props.handleClick(blankSquare, props.type)
                                }
                            >
                                <HighlightOffIcon className="clear-cat" />
                            </Item>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-edit-cats"
            >
                <Box className="add-item" sx={modalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Add new {props.type}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={buttonStyle}
                        component="label"
                    >
                        Upload Photo
                        <input
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            onChange={uploadItem}
                        />
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

ViewPage.propTypes = {
    type: PropTypes.string,
    handleClick: PropTypes.func,
    images: PropTypes.array,
    uploadItem: PropTypes.func,
    modOutfitOn: PropTypes.bool,
    userId: PropTypes.string,
    editMode: PropTypes.bool,
    setEditMode: PropTypes.func,
};
