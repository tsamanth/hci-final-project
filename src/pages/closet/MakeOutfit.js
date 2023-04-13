import { Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    height: '20vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
}));

const GridButtons = styled(Grid)(() => ({
    width: '50%',
    margin: '0% 25%',
}));

export default function MakeOutfit(props) {
    return (
        <div className="make-outfit">
            <Grid container spacing={2}>
                {props.items.map(item => (
                    <Grid item xs={6} key={item.type}>
                        <Item
                            onClick={() => {
                                props.handleItemClick(item.type, true);
                            }}
                        >
                            <img src={item.url} />
                        </Item>
                        <p>{item.type}</p>
                    </Grid>
                ))}
            </Grid>
            <GridButtons container spacing={1}>
                <Grid item xs={6}>
                    <Button onClick={props.redo} variant="outlined">
                        Redo
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={props.save} variant="outlined">
                        Save
                    </Button>
                </Grid>
            </GridButtons>
        </div>
    );
}

MakeOutfit.propTypes = {
    handleItemClick: PropTypes.func,
    items: PropTypes.array,
    redo: PropTypes.func,
    catagories: PropTypes.array,
    setCatagories: PropTypes.func,
    save: PropTypes.func,
};
