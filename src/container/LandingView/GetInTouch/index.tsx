import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Title from '../Title';
import Paragraph from '../Paragraph';

const GetInTouch = () => {
   return (
      <Stack
         component='section'
         direction='column'
         justifyContent='center'
         alignItems='center'
         sx={{
            py: 10,
            mx: 6,
         }}
      >
         <Title text={'Chia sẻ yêu thương, hiến máu để cứu người.'} textAlign={'center'} />
         <Paragraph
            text={`Sức khỏe của bạn có thể là cuộc sống của ai đó.`}
            maxWidth={'sm'}
            mx={0}
            textAlign={'center'}
         />
         <Button
            component={Link}
            to={'/login'}
            variant='contained'
            type='submit'
            size='medium'
            sx={{
               fontSize: '0.9rem',
               textTransform: 'capitalize',
               py: 2,
               px: 4,
               mt: 3,
               mb: 2,
               borderRadius: 0,
               backgroundColor: '#14192d',
               '&:hover': {
                  backgroundColor: '#1e2a5a',
               },
            }}
         >
            Đăng kí ngay
         </Button>
      </Stack>
   );
};

export default GetInTouch;
