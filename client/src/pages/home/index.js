import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Apps from '@mui/icons-material/Apps';
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

const cards = [1, 2, 3, 4, 5, ];

const theme = createTheme();

export default function Home() {
  const [packages, setPackages]= React.useState(null)

  packagesService.getPackagesOverview()
  .then(res => {

  })
  .catch(err => {

  })



  return packages && (
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
                {cards.map((card) => (
                        <Card sx={{ display: 'flex' }} key={card}>
                            <CardMedia
                                component="img"
                                sx={{ width: 125, heigh: 125 }}
                                image="https://source.unsplash.com/random?h=100&w=100"
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Live From Space
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Version 1.0.0 (65434)
                                    </Typography>
                                </CardContent>
                            </Box>

                        </Card>
                ))}
                </Stack>
          </Box>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}