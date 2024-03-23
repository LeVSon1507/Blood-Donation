import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import one from 'src/assets/images/undraw_blooming_re_2kc4.svg';
import two from 'src/assets/images/undraw_doctor_kw-5-l.svg';
import three from 'src/assets/images/undraw_professor_re_mj1s.svg';
import four from 'src/assets/images/undraw_quick_chat_re_bit5.svg';
import five from 'src/assets/images/undraw_doctors_p6aq.svg';
import Title from '../../Title';
import Paragraph from '../../Paragraph';

const Gallery = () => {
   const [currentIndex, setCurrentIndex] = useState(0);

   const imageData = [
      {
         alt: 'image1',
         image: one,
      },
      {
         alt: 'image2',
         image: two,
      },
      {
         alt: 'image3',
         image: three,
      },
      {
         alt: 'image4',
         image: four,
      },
      {
         alt: 'image5',
         image: five,
      },
   ];

   // const imageData = [
   //    {
   //       alt: 'image1',
   //       url: 'https://t3.ftcdn.net/jpg/04/17/61/90/360_F_417619090_iVZEF560PanNYbGrgzcb0P9gYhyXFX2o.jpg',
   //    },
   //    {
   //       alt: 'image2',
   //       url: 'https://images.pexels.com/photos/5411784/pexels-photo-5411784.jpeg?cs=srgb&dl=pexels-andrea-davis-5411784.jpg&fm=jpg',
   //    },
   //    {
   //       alt: 'image3',
   //       url: 'https://images.pexels.com/photos/356809/pexels-photo-356809.jpeg?cs=srgb&dl=pexels-daniel-frank-356809.jpg&fm=jpg',
   //    },
   //    {
   //       alt: 'image4',
   //       url: 'https://images.pexels.com/photos/6267516/pexels-photo-6267516.jpeg?cs=srgb&dl=pexels-get-lost-mike-6267516.jpg&fm=jpg',
   //    },
   //    {
   //       alt: 'image5',
   //       url: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?cs=srgb&dl=pexels-huseyn-kamaladdin-667838.jpg&fm=jpg',
   //    },
   // ];

   const renderSlides = imageData.map(image => (
      <div key={image.alt}>
         <img src={image.image} alt={image.alt} />
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
            <Title text={'Giọt Máu Hồng'} textAlign={'center'} />

            <Paragraph
               text={`Chào mừng bạn đến với trang web chúng tôi, nơi nâng cao nhận thức và khuyến khích hoạt động hiến máu. Chúng tôi tin rằng việc hiến máu không chỉ là hành động cao cả mà còn là cách giản đơn để cứu sống người khác. Trang web của chúng tôi cung cấp thông tin chi tiết về quy trình hiến máu, lợi ích của việc hiến máu đối với cộng đồng và tất cả những điều bạn cần biết để trở thành một tình nguyện viên hiến máu.`}
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
