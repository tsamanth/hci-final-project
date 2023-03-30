import React from 'react';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        background: 'none',
        borderTop: 'solid black 1px',
    },
    toolbar: {
        width: '100%',
    },
    navlinks: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        fontSize: '1.5em',
        '&:hover': {
            color: 'dark-grey',
            background: 'lightGrey',
            borderRadius: '5px',
        },
    },
}));

function Navbar() {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <CssBaseline />
            <Toolbar className={classes.toolbar}>
                <div className={classes.navlinks}>
                    <Link className={classes.link} to="/closet">
                        Closet
                    </Link>
                    <Link className={classes.link} to="/search">
                        Search
                    </Link>
                    <Link className={classes.link} to="/add">
                        Add
                    </Link>
                    <Link className={classes.link} to="/explore">
                        Explore
                    </Link>
                    <Link className={classes.link} to="/profile">
                        Profile
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
