import React from 'react';
import Content from './content';
import Gallery from './gallery';
import Navbar from '../../../components/Navbar';
import Footer from '../Footer';
import LazyShow from '../Animated/LazyShow';
import Canvas from '../Animated/Canvas';

const About = () => {
   return (
      <>
         <Navbar />
         <LazyShow>
            <>
               <Content />
               <Canvas />
            </>
         </LazyShow>
         <LazyShow>
            <Gallery />
         </LazyShow>
         <Canvas />
         <Footer />
      </>
   );
};

export default About;
