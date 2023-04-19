import PropTypes from 'prop-types';
import { Box, Grid, Paper, Modal, Typography, FormGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { modalStyle } from '../../display';
import { Button } from '@mui/material';
import { buttonStyle } from '../../display';
import { db } from '../../firebase';
import { update, ref } from 'firebase/database';
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
    const uploadItem = e => {
        const file = e.target.files[0];
        const imgUrl = window.URL.createObjectURL(file);
        const updates = {
            [props.type]: [...props.images, imgUrl],
        };
        update(ref(db, `users/${props.userId}/closet`), updates);
    };
    const removeItem = (url, type) => {
        const newImgs = props.images.filter(i => {
            return i != url;
        });
        const updates = {
            [props.type]: newImgs,
        };
        update(ref(db, `users/${props.userId}/closet`), updates);
    };
    let listImages = <></>;
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
                        <Grid item xs={4}>
                            <Item onClick={handleModalOpen}>
                                <AddCircleOutlineIcon className="add-clothing-button" />
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
};
