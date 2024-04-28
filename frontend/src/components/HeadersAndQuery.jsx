import { Typography, Accordion, AccordionSummary, AccordionDetails, Box, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HeadersAndQuery = ({ obj, type }) => {
  const array = Object.entries(obj);
  return (
    <Box sx={{ marginBottom: 1 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon color="customWhite" />}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {type} ({array.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={0}>
            {array.map((nestedArr, index) => {
              return (
                <Grid container spacing={0} key={`${type}-${index}`}>
                  <Grid item xs={3}>
                    <Typography variant="monospaced" sx={{ wordWrap: 'break-word' }}>
                      {nestedArr[0]}
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="monospaced" sx={{ wordWrap: 'break-word' }}>
                      {nestedArr[1]}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default HeadersAndQuery;
