import { Button, Paper, Tooltip, Typography } from '@mui/material';
import service from '../services';
import { useNavigate } from 'react-router-dom';

const EndpointHeader = ({ binPath }) => {
  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/endpoints/${binPath}`;
  const navigate = useNavigate();
  const copyHandler = () => {
    navigator.clipboard.writeText(endpoint);
  };

  const deleteBinHandler = async () => {
    await service.deleteBin(binPath);
    navigate('/');
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1.5,
        marginTop: 1.5,
        gap: '20px',
        padding: '10px',
      }}
    >
      <Typography sx={{ padding: 1 }}>
        Endpoint is: <b>{endpoint}</b>
      </Typography>
      <Tooltip title="Copy to clipboard">
        <Button size="small" variant="contained" onClick={copyHandler}>
          Copy
        </Button>
      </Tooltip>
      <Button sx={{ marginLeft: 'auto' }} size="small" variant="contained" onClick={deleteBinHandler}>
        Delete Endpoint
      </Button>
    </Paper>
  );
};

export default EndpointHeader;
