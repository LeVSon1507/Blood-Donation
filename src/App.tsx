import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './container/HomePage';
import QA from './container/QA';
import News from './container/News';
import ContactUs from './container/ContactUs';
import Profile from './container/Profile';

function App() {
   const router = createBrowserRouter([
      {
         path: '/',
         element: <HomePage />,
      },
      {
         path: '/profile',
         element: <Profile />,
      },
      {
         path: '/qa',
         element: <QA />,
      },
      {
         path: 'news',
         element: <News />,
      },
      {
         path: 'contact-us',
         element: <ContactUs />,
      },
   ]);

   return <RouterProvider router={router} />;
}

export default App;
