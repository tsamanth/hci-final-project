import PropTypes from 'prop-types';
import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Sidebar(props) {
    const handleClose = () => {
        props.setSidebarOpen(false);
    };
    const navigate = useNavigate();
    return (
        <div>
            <Drawer
                variant="temporary"
                anchor="left"
                open={props.sidebarOpen}
                onClose={handleClose}
            >
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        {['Tops', 'Bottoms'].map(text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText
                                        primary={text}
                                        onClick={() => {
                                            props.handleClick(text);
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

Sidebar.propTypes = {
    sidebarOpen: PropTypes.bool,
    setSidebarOpen: PropTypes.func,
    handleClick: PropTypes.func,
};
