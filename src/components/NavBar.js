import React from 'react';
import { AppBar, Toolbar, CssBaseline, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const useStyles = makeStyles(theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        background: 'white',
        borderTop: 'solid black 1px',
        fontFamily: 'Cabin',
        fontSize: '15px',
        textTransform: 'lowercase',
    },
    toolbar: {
        width: '100%',
        minHeight: '40px',
    },
    navlinks: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
    },
}));

export default function Navbar(props) {
    const classes = useStyles();
    const setModOutfitFalse = () => {
        props.setModOutfit(false);
    };
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <CssBaseline />
            <Toolbar id="nav-bar" className={classes.toolbar}>
                <div className={classes.navlinks}>
                    <Link
                        onClick={setModOutfitFalse}
                        className={classes.link}
                        to="/closet/tops"
                    >
                        <CheckroomIcon className="icon" sx={{ fontSize: 32 }} />
                        <p>Closet</p>
                    </Link>
                    <Link
                        className={classes.link}
                        exact
                        to="/closet/make-outfit"
                    >
                        <AddCircleOutlineIcon
                            className="icon"
                            sx={{ fontSize: 32 }}
                        />
                        <p>Make</p>
                    </Link>
                    <Link className={classes.link} to="/profile">
                        <AccountCircleOutlinedIcon
                            className="icon"
                            sx={{ fontSize: 32 }}
                        />
                        <p>Profile</p>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}

Navbar.propTypes = {
    setModOutfit: PropTypes.func,
};
