import RequestLine from './RequestLine';
import { List, Paper, Typography, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { determineBinId } from '../helpers';
import service from '../services';

const RequestList = ({ requests, selectedRequest, setSelectedRequest }) => {
  const selectedRequestId = selectedRequest ? selectedRequest.id : 0;

  const onDeleteAll = async () => {
    const binPath = determineBinId(requests[0].http_path);
    await service.deleteAllRequestsInBin(binPath);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ textAlign: 'left' }}>
        Requests
      </Typography>
      <List>
        {requests.map((req) => {
          return (
            <RequestLine
              key={req.id}
              request={req}
              selectedRequestId={selectedRequestId}
              setSelectedRequest={setSelectedRequest}
            />
          );
        })}
      </List>
      {requests.length > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
          sx={{ minWidth: 0, '&:hover': { color: 'red' }, cursor: 'pointer' }}
          paddingTop={3}
          onClick={onDeleteAll}
        >
          <DeleteIcon />
          DELETE ALL
        </Stack>
      )}
    </Paper>
  );
};

export default RequestList;
