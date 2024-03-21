import { useState } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import anonymous from 'src/assets/images/gallery/anonymous.png';
import post from 'src/assets/images/gallery/post.png';
import wall_post from 'src/assets/images/gallery/wall_post.png';
import chat from 'src/assets/images/gallery/chat.png';
import it_support_monochromatic from 'src/assets/images/gallery/it-support-monochromatic.png';
import Title from '../../Title';
import Paragraph from '../../Paragraph';

const Gallery = () => {
   const [currentIndex, setCurrentIndex] = useState(0);

   // const imageData = [
   //   {
   //     alt: 'image1',
   //     image: anonymous,
   //   },
   //   {
   //     alt: 'image2',
   //     image: post,
   //   },
   //   {
   //     alt: 'image3',
   //     image: wall_post,
   //   },
   //   {
   //     alt: 'image4',
   //     image: chat,
   //   },
   //   {
   //     alt: 'image5',
   //     image: it_support_monochromatic,
   //   },
   // ];

   const imageData = [
      {
         alt: 'image1',
         url: 'https://t3.ftcdn.net/jpg/04/17/61/90/360_F_417619090_iVZEF560PanNYbGrgzcb0P9gYhyXFX2o.jpg',
      },
      {
         alt: 'image2',
         url: 'https://images.pexels.com/photos/5411784/pexels-photo-5411784.jpeg?cs=srgb&dl=pexels-andrea-davis-5411784.jpg&fm=jpg',
      },
      {
         alt: 'image3',
         url: 'https://images.pexels.com/photos/356809/pexels-photo-356809.jpeg?cs=srgb&dl=pexels-daniel-frank-356809.jpg&fm=jpg',
      },
      {
         alt: 'image4',
         url: 'https://images.pexels.com/photos/6267516/pexels-photo-6267516.jpeg?cs=srgb&dl=pexels-get-lost-mike-6267516.jpg&fm=jpg',
      },
      {
         alt: 'image5',
         url: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?cs=srgb&dl=pexels-huseyn-kamaladdin-667838.jpg&fm=jpg',
      },
   ];

   const renderSlides = imageData.map(image => (
      <div key={image.alt}>
         <img src={image.url} alt={image.alt} />
      </div>
   ));

   const handleChange = index => {
      setCurrentIndex(index);
   };

   return (
      <Stack
         direction='column'
         justifyContent='center'
         alignItems='center'
         sx={{
            py: 8,
            px: 2,
            display: { xs: 'flex' },
         }}
      >
         <Box
            component='section'
            sx={{
               paddingBottom: 3,
            }}
         >
            <Title text={'User Trust and Satisfaction'} textAlign={'center'} />
            <Typography
               variant='h5'
               component='h4'
               align='center'
               sx={{
                  paddingTop: 1,
               }}
            >
               Topic Gallery
            </Typography>
            <Paragraph
               text={`Become part of a community where thousands of users have expressed their confidence in our dedication to maintaining a secure and interactive platform for anonymous discussions.`}
               maxWidth={'sm'}
               mx={'auto'}
               textAlign={'center'}
            />
         </Box>

         <Box
            sx={{
               maxWidth: 700,
               width: '100%',
            }}
         >
            <Carousel
               centerSlidePercentage={40}
               thumbWidth={180}
               dynamicHeight={false}
               centerMode={false}
               showArrows={false}
               autoPlay={false}
               infiniteLoop={true}
               selectedItem={currentIndex}
               onChange={handleChange}
               className='carousel-container'
            >
               {renderSlides}
            </Carousel>
         </Box>
      </Stack>
   );
};

export default Gallery;
