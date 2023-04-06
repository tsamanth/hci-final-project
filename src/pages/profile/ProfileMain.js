
import React from 'react'
import {Grid, Button} from '@mui/material';
<<<<<<< Updated upstream
=======
import { borderBottom } from '@mui/system';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Profile(props) {
    const location  = useLocation();
    const [tops, addtop] = useState([]);
    const [bottoms, addbot] = useState([]);
    const [total, addTotal] = useState(0)
    const [list, setList] = useState(window.fits);

    const url = "https://hci-final-a1f8e-default-rtdb.firebaseio.com";
    const navigate = useNavigate();


    const deleteFit = (index) => {
        if (window.fits.length > 0 && index >= 0){
            window.fits = window.fits.splice(index-1, 1);  
            setList(window.fits);
        }
    }
    
    const showOutfits = () => {
        let fit = []
        //alert(JSON.stringify(window.fits));

        let i = 1;
        window.fits.forEach(element => {
            fit.push(        <div style= {{
                display:"flex",
                justifyContent:"left",
                margin: "18px 10px",
            }}>
            <div style = {{display:"flex", width:"100%"}}>
                    <h4 style = {{display: "left",}}>Style {i}</h4>
                    <Button style = {{marginLeft: "10px", marginTop: "18px", width: "10%", height: "40%"}} size = "small" variant = "outlined" onClick={() => {deleteFit(i)}}>Delete</Button>
                </div>
            
                
            </div>)
            fit.push(
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm:3, md: 4}}>
                <Grid item xs={4}>
                <div>
                <img style = {{width :"100%", height:"100%"}}
                    src = {element[0]}
                />
                </div>
                </Grid>
                <Grid item xs={4}>
                <div>
                <img style = {{width :"100%", height:"100%"}}
                    src = {element[1]}
                />
                </div>
                </Grid>
                </Grid>
            )

            i++;
        });

        return fit;
        
    }
>>>>>>> Stashed changes

    return (
    <div>
        <div style= {{
            display:"flex",
            justifyContent:"space-around",
            margin: "10px 10px",
            borderBottom: "1px solid grey"
        }}>
            <div >
                <img style = {{width :"140px", height:"140px", borderRadius:"80px"}}
                src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                />
            </div>
            <div style = {{margin: "10px"}}>
                <h3>STEM</h3>
                <div style = {{display:"flex", justifyContent:"space-between", width:"100%"}}>
<<<<<<< Updated upstream
                    <h4 style = {{margin: "0px 5px"}}>0 posts</h4>
                    <h4 style = {{margin: "0px 5px"}}>0 followers</h4>
                    <h4 style = {{margin: "0px 5px"}}>0 following</h4>
=======
                    <h4 style = {{display: "center", margin: "0px 50px"}}>{tops.length} posts</h4>
>>>>>>> Stashed changes
                </div>
                <div style = {{margin: "10px"}}>
                    <Button size = "small" variant = "outlined">Edit Profile</Button>
                </div>
            </div>
        </div>
        <div>
            {
                showOutfits()
            }
        </div>
    </div>
    )
    
}

Profile.propTypes = {
    currOutfit: PropTypes.array,
    top: PropTypes.string,
    bottom: PropTypes.string

};
