import EndpointHeader from './EndpointHeader';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import service from '../services';
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';
import { socket } from '../socket';
import { Grid } from '@mui/material';
import PlaceHolderText from './PlaceHolderText';
import Image from 'mui-image';

const Bin = () => {
  const { bin_path } = useParams();
  const [requestList, setRequestList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const handleNewRequest = (request) => {
      setRequestList((previous) => [...previous, request]);
    };

    const handleDeleteRequest = (mongoId) => {
      setRequestList((previous) => previous.filter((r) => r.mongo_id !== mongoId));
      selectedRequest && setSelectedRequest((previous) => (previous.id === mongoId ? null : previous));
    };

    const handleDeleteAllRequests = () => {
      setSelectedRequest(null);
      setRequestList([]);
    };

    const requestDetails = async () => {
      const list = await service.getRequestList(bin_path);
      setRequestList(list);
    };
    requestDetails();

    socket.emit('joinBinRoom', bin_path);
    socket.on('newRequest', handleNewRequest);
    socket.on('deleteRequest', handleDeleteRequest);
    socket.on('deleteAllRequests', handleDeleteAllRequests);

    return () => {
      socket.off('newRequest', handleNewRequest);
      socket.off('deleteRequest', handleDeleteRequest);
      socket.off('deleteAllRequests', handleDeleteAllRequests);
    };
  }, [bin_path, selectedRequest]);

  return (
    <Grid padding={2} rowSpacing={1} columnSpacing={3} container>
      <Grid item xs={1}>
        <Image src="/transparent-icon.png" duration={0} width="75px" height="75px" />
      </Grid>
      <Grid item xs={11}>
        <EndpointHeader binPath={bin_path} />
      </Grid>
      <Grid item xs={3}>
        <RequestList requests={requestList} selectedRequest={selectedRequest} setSelectedRequest={setSelectedRequest} />
      </Grid>
      <Grid item xs={9}>
        {selectedRequest ? <RequestDetails request={selectedRequest} /> : <PlaceHolderText />}
      </Grid>
    </Grid>
  );
};

export default Bin;
