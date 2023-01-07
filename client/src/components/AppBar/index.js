import AppBar  from '@mui/material/AppBar';
import Apps from '@mui/icons-material/Apps';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';


export default () =>  {

    return (
        <AppBar position="relative" sx={{ bgcolor: "#323232" }}>
            <Toolbar color="info">
                <Apps sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>
                    App
                </Typography>
            </Toolbar>
        </AppBar>
    )
}