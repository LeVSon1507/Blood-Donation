import React from 'react';
import Content from './content';
import Gallery from './gallery';
import LazyShow from '../Animated/LazyShow';
import Canvas from '../Animated/Canvas';

const About = () => {
   return (
      <>
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
      </>
   );
};

export default About;
