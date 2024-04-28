import { useNavigate } from 'react-router-dom';
import service from '../services';
import { Button, Container, Typography, Stack, Box } from '@mui/material';
import Image from 'mui-image';

const Home = () => {
  const navigate = useNavigate();

  const newBinHandler = async () => {
    const binPath = await service.createBin();
    navigate(`/display/${binPath}`);
  };

  return (
    <Stack
      direction="row"
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1, height: '100vh' }}
    >
      <Container maxWidth="sm">
        <Stack direction="column" textAlign="center" justifyContent="center" alignItems="center">
          <Image src="/transparent-icon.png" width="50%" sx={{ paddingBottom: 6 }} />
          <Typography variant="h1">Whirlpool</Typography>
          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Button variant="contained" size="large" onClick={newBinHandler}>
              Create Pool
            </Button>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
};
export default Home;
