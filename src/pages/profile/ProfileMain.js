
import React from 'react'
import {Grid, Button} from '@mui/material';

export default function Profile() {
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
                    <h4 style = {{margin: "0px 5px"}}>0 posts</h4>
                    <h4 style = {{margin: "0px 5px"}}>0 followers</h4>
                    <h4 style = {{margin: "0px 5px"}}>0 following</h4>
                </div>
                <div style = {{margin: "10px"}}>
                    <Button size = "small" variant = "outlined">Edit Profile</Button>
                </div>
            </div>
        </div>

        <div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm:3, md: 4}}>
                <Grid item xs={4}>
                    <div>
                    <img style = {{width :"100%", height:"100%"}}
                    src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div>
                    <img style = {{width :"100%", height:"100%"}}
                    src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div>
                    <img style = {{width :"100%", height:"100%"}}
                    src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div>
                    <img style = {{width :"100%", height:"100%"}}
                    src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    />
                    </div>
                </Grid>
            </Grid>
        </div>
    </div>
    )
}
