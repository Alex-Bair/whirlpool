import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const RequestDetailsBody = ({ obj }) => {
  return (
    <Box sx={{ marginBottom: 1 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon color="customWhite" />}>
          <Typography sx={{ fontWeight: 'bold' }}>Body</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <pre style={{ margin: '0', whiteSpace: 'pre-wrap' }}>{JSON.stringify(obj, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default RequestDetailsBody;
