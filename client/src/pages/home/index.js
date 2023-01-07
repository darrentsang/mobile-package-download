import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
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
  const navigate = useNavigate()
  const [packages, setPackages]= React.useState([])
  React.useEffect(() => {
    loadPackages();
  }, [])

  const loadPackages = () => {

    packagesService.getPackagesOverview()
    .then(data => {
      setPackages(data)
    })
    .catch(err => {
      console.log(err)
      return navigate('/login')
    })
  }
  
  const onClickPackage = (packageName) => {
    navigate(`/package/${packageName}`)
  }

  return packages.length > 0 && (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <main>
        <Container sx={{ py: 8 }} maxWidth="xs">
          {/* End hero unit */}
          <Box sx={{ width: '100%' }} >
            <Stack spacing={2}>
                {packages.map((p) => (
                        <Card sx={{ display: 'flex' }} key={p.id} onClick={() => onClickPackage(p.displayName)}>
                            <CardMedia
                                component="img"
                                sx={{ width: 100, heigh: 100 }}
                                image={p.icon}
                                alt={p.displayName}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {p.displayName}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Version {p.versionName} ({p.buildVersion})
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