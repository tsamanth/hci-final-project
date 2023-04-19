import styled from 'styled-components';
import { styled as muistyled } from '@mui/material';
import { Grid } from '@mui/material';

export const Header = styled.div`
    position: fixed;
    top: 0;
    border-bottom: 1px solid black;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: white;
    font-family: 'Cabin';
    text-transform: lowercase;
    font-size: 18px;
`;

export const buttonStyle = {
    fontFamily: 'Cabin',
    textTransform: 'lowercase',
    fontSize: '14px',
};

export const GridButtons = muistyled(Grid)(() => ({
    width: '50%',
    margin: '0% 25%',
}));

export const modalStyle = {
    fontFamily: 'Cabin',
    textTransform: 'lowercase',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: '3px',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
