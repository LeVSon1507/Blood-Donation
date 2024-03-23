import { Container, Grid, Typography, Paper } from '@mui/material';
import '../styles.scss';

const FAQSection = ({ selfQA }) => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div style={{ textAlign: 'center' }}>
            <Typography className="text" variant="h5" component="p">
              GOT QUESTIONS ? I´VE GOT ANSWERS !
            </Typography>
            <Typography className="text" variant="h4">
              Questions Answered
            </Typography>
          </div>
        </Grid>
        {selfQA &&
          selfQA?.map((item, index) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                  <Typography className="text" variant="h6" gutterBottom component="div">
                    <strong>Subject:</strong> {item?.subject}
                  </Typography>
                  <Typography className="text" variant="body1">
                    <strong>Message:</strong> {item?.content}
                  </Typography>
                  <Typography className="text" variant="body1">
                    {!item?.answerContent ? (
                      <Typography className="waitingReplyText">Waiting for answer from admin</Typography>
                    ) : (
                      <span>
                        <strong>Admin answer:</strong>
                        {item?.answerContent}
                      </span>
                    )}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default FAQSection;
