import { Typography, Paper } from '@mui/material';
import { removeBinFromPath } from '../helpers';

const SharedDetails = ({ request }) => {
  return (
    <Paper sx={{ marginBottom: 1, minHeight: '48px' }}>
      <Typography
        sx={{
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: '12px',
          paddingBottom: '12px',
          wordWrap: 'break-word',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '15px',
        }}
        component="div"
      >
        <b>HTTP Request: </b>
        <Typography variant="monospaced">{request.payload.method}</Typography>
        <Typography variant="monospaced" sx={{ flexGrow: 2 }}>
          {removeBinFromPath(request.payload.path)}
        </Typography>
        <Typography>{request.date.toJSON()}</Typography>
      </Typography>
    </Paper>
  );
};

export default SharedDetails;
