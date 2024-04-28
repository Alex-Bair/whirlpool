import { determineBinId, removeBinFromPath } from '../helpers';
import service from '../services';
import { ListItemButton, ListItemText, Typography, Stack, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const RequestLine = ({ request, selectedRequestId, setSelectedRequest }) => {
  const binId = determineBinId(request.http_path);
  const path = removeBinFromPath(request.http_path);
  const method = request.http_method;
  const time = request.received_at;

  function convertDbTimetoDateObj(databaseTime) {
    databaseTime = databaseTime.slice(0, 10) + 'T' + databaseTime.slice(11, 23) + 'Z';
    return new Date(databaseTime);
  }

  const onClick = async (event) => {
    event.preventDefault();
    const req = await service.getRequest(request.id);
    req.date = convertDbTimetoDateObj(time);
    setSelectedRequest(req);
  };

  const onDeleteClick = async () => {
    await service.deleteRequest(binId, request.id);
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ minWidth: 0 }}>
      <ListItemButton onClick={onClick} selected={selectedRequestId === request.mongo_id} sx={{ borderRadius: 3 }}>
        <ListItemText>
          <Typography noWrap>
            {convertDbTimetoDateObj(time).toLocaleTimeString()}
            <Typography variant="monospaced" sx={{ ml: 2 }}>
              {method} {path}
            </Typography>
          </Typography>
        </ListItemText>
      </ListItemButton>
      <Box>
        <DeleteIcon sx={{ '&:hover': { color: 'red' } }} onClick={onDeleteClick} />
      </Box>
    </Stack>
  );
};

export default RequestLine;
