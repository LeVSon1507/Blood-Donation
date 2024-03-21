import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import News from './container/News';
import ContactUs from './container/ContactUs';
import LandingView from './container/LandingView';
import Navbar from './components/Navbar';
import Footer from './container/LandingView/Footer';
import Profile from './container/Profile/Profile';
import About from './container/LandingView/about';
import QA from './container/QA/QA';
import HomePage from './container/Home/HomePage';

function App() {
   const renderBaseComponents = (element: React.ReactNode) => {
      return (
         <>
            <Navbar />
            {element}
            <Footer />
         </>
      );
   };

   const router = createBrowserRouter([
      {
         path: '/',
         element: <LandingView />,
      },
      {
         path: '/about-us',
         element: renderBaseComponents(<About />),
      },
      {
         path: '/login',
         element: <h1>Login</h1>,
      },
      {
         path: '/register',
         element: <h1>Login</h1>,
      },
      {
         path: '/home',
         element: renderBaseComponents(<HomePage />),
      },
      {
         path: '/profile',
         element: renderBaseComponents(<Profile />),
      },
      {
         path: '/qa',
         element: renderBaseComponents(<QA />),
      },
      {
         path: '/news',
         element: renderBaseComponents(<News />),
      },
      {
         path: '/contact-us',
         element: renderBaseComponents(<ContactUs />),
      },
   ]);

   return <RouterProvider router={router} />;
}

export default App;
