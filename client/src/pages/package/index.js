import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Apps from '@mui/icons-material/Apps';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import GetAppRounded from '@mui/icons-material/GetAppRounded';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
import * as packagesService from '../../services/packages'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © Darren Tsang '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

export default function Package() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [data, setData] = React.useState(null)
  React.useEffect(() => {
    LoadPackages();
  }, [])

  const LoadPackages = async () => {
    try {
        const resData = await packagesService.postPckageVersionHistory(name)
        if(!resData || resData.length <= 0) return


        const top1Package = await packagesService.getPackage(resData[0].id)

        setData({
            firstPackage: top1Package,
            packages: resData
        })  

    } catch ( err ) {
        console.log(err)
        return navigate('/login')
    }
  }

  return data && (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Apps sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            App
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="xs">
          {/* End hero unit */}
          <Box sx={{ width: '100%' }} >
            <Stack spacing={2}>
                <Card sx={{ display: 'flex' }} key={data.firstPackage.id} >
                    <CardMedia
                        component="img"
                        sx={{ width: 100, heigh: 100 }}
                        image={data.firstPackage.icon}
                        alt={data.firstPackage.displayName}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {data.firstPackage.displayName}
                            </Typography>
                            {/* <Typography variant="subtitle1" color="text.secondary" component="div">
                                Version {data.firstPackage.versionName} ({data.firstPackage.buildVersion})
                            </Typography> */}
                        </CardContent>
                    </Box>
                </Card>
                
                <List dense={true}>
                {data.packages.map((p) => (
                    <ListItem
                        secondaryAction={
                        <IconButton edge="end" aria-label="download">
                            <GetAppRounded />
                        </IconButton>
                        }
                    >
                        <ListItemText
                        primary={p.displayName + " Version " + p.versionName + " (" + p.buildVersion + ") "}
                        />
                    </ListItem>
                )) }
                </List>
                </Stack>
          </Box>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {/* Something here to give the footer a purpose! */}
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}