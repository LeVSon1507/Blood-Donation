import { Grid, Typography, IconButton, Card, CardContent } from '@mui/material';
// icons
import TopicIcon from '@mui/icons-material/Topic';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SecurityIcon from '@mui/icons-material/Security';

// image
import itSupport from 'src/assets/images/it-support-flatline.svg';

// components
import Paragraph from '../../Paragraph';
import Title from '../../Title';

const Content = () => {
   return (
      <Grid
         container
         spacing={0}
         sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            py: 10,
            px: 2,
         }}
      >
         <Grid item xs={12} sm={12} md={5} component='section'>
            <Title text={'What we are offering?'} textAlign={'start'} />

            <Typography
               variant='h6'
               component='h4'
               sx={{
                  fontWeight: '400',
                  paddingTop: 1,
               }}
            >
               Diverse Topics and Discussions
            </Typography>

            <Paragraph
               text={`Explore a wide array of topics and engage in diverse discussions, connecting with individuals who share your interests and passions.`}
               maxWidth={'75%'}
               mx={0}
               textAlign={'start'}
            />
         </Grid>

         <Grid item xs={12} sm={6} md={3}>
            <Card
               square={true}
               sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid #ccc',
               }}
            >
               <CardContent>
                  <IconButton>
                     <TopicIcon fontSize='large' color='secondary' />
                  </IconButton>
                  <Typography
                     variant='h5'
                     component='p'
                     sx={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                     }}
                  >
                     Random chat by topic
                  </Typography>
               </CardContent>
            </Card>
         </Grid>

         <Grid item xs={12} sm={6} md={3}>
            <Card
               square={true}
               sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid #ccc',
               }}
            >
               <CardContent>
                  <IconButton>
                     <LocalShippingIcon fontSize='large' color='secondary' />
                  </IconButton>
                  <Typography
                     variant='h5'
                     component='p'
                     sx={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                     }}
                  >
                     Real-time chat
                  </Typography>
               </CardContent>
            </Card>
         </Grid>

         <Grid
            item
            xs={12}
            sm={6}
            md={2}
            sx={{
               display: { xs: 'none', sm: 'block' },
            }}
         >
            <Card
               square={true}
               sx={{
                  boxShadow: 'none',
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
               }}
            >
               <CardContent>
                  <img src={itSupport} alt='functionsvg' width={250} height={250} />
               </CardContent>
            </Card>
         </Grid>

         <Grid item xs={12} sm={6} md={3}>
            <Card
               square={true}
               sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid #ccc',
               }}
            >
               <CardContent>
                  <IconButton>
                     <ConnectWithoutContactIcon fontSize='large' color='secondary' />
                  </IconButton>
                  <Typography
                     variant='h5'
                     component='p'
                     sx={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                     }}
                  >
                     Create, edit, delete manage content.
                  </Typography>
               </CardContent>
            </Card>
         </Grid>

         <Grid item xs={12} sm={6} md={3}>
            <Card
               square={true}
               sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid #ccc',
               }}
            >
               <CardContent>
                  <IconButton>
                     <AddReactionIcon fontSize='large' color='secondary' />
                  </IconButton>
                  <Typography
                     variant='h5'
                     component='p'
                     sx={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                     }}
                  >
                     Chat with strangers.
                  </Typography>
               </CardContent>
            </Card>
         </Grid>

         <Grid item xs={12} sm={6} md={3}>
            <Card
               square={true}
               sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid #ccc',
               }}
            >
               <CardContent>
                  <IconButton>
                     <SecurityIcon fontSize='large' color='secondary' />
                  </IconButton>
                  <Typography
                     variant='h5'
                     component='p'
                     sx={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                     }}
                  >
                     Security
                  </Typography>
               </CardContent>
            </Card>
         </Grid>
      </Grid>
   );
};

export default Content;
