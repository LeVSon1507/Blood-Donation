import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import News from './container/News';
import LandingView from './container/LandingView';
import Navbar from './components/Navbar';
import Footer from './container/LandingView/Footer';
import Profile from './container/Profile/Profile';
import About from './container/LandingView/about';
import QA from './container/QA/QA';
import HomePage from './container/Home/HomePage';
import Login from './container/Login';
import RegisterPage from './container/Register';
import ErrorPage from './components/ErrorPage';
import ContactUs from './container/ContactUs';
import { AuthProvider } from './context';

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
         element: <Login />,
      },
      {
         path: '/register',
         element: <RegisterPage />,
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
      {
         path: '*',
         element: <ErrorPage />,
      },
   ]);

   return (
      <AuthProvider>
         <RouterProvider router={router} />
      </AuthProvider>
   );
}

export default App;
