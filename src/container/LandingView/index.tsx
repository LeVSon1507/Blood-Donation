import Header from './Header';
import GetStarted from './GetStarted';
import GetInTouch from './GetInTouch';
import Footer from './Footer';
import Navbar from '../../components/Navbar';
import { getStarted } from './helpers';
import LazyShow from './Animated/LazyShow';
import Canvas from './Animated/Canvas';

const LandingView = () => {
   return (
      <>
         <Navbar />
         <Header />
         <LazyShow>
            <Canvas />
         </LazyShow>
         {getStarted.map((item, index) => (
            <GetStarted
               key={index}
               title1={item.title1}
               title2={item.title2}
               imgDetail1={item.imgDetail1}
               imgDetail2={item.imgDetail2}
               content1={item.content1}
               content2={item.content2}
            />
         ))}
         <LazyShow>
            <Canvas />
         </LazyShow>
         <LazyShow>
            <GetInTouch />
         </LazyShow>
         <Footer />
      </>
   );
};

export default LandingView;
