import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './container/HomePage';
import QA from './container/QA';
import News from './container/News';
import ContactUs from './container/ContactUs';
import Profile from './container/Profile';
import LandingView from './container/LandingView';
import Navbar from './components/Navbar';
import Footer from './container/LandingView/Footer';

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
         path: '/login',
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
