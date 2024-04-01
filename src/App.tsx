import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingView from './container/LandingView';
import Navbar from './components/Navbar';
import Footer from './container/LandingView/Footer';
import Profile from './container/Profile/Profile';
import About from './container/LandingView/about';
import QA from './container/QA/QA';
import Login from './container/Login';
import RegisterPage from './container/Register';
import ErrorPage from './components/ErrorPage';
import ContactUs from './container/ContactUs';
import { AuthProvider } from './context';
import News from './container/News';
import ManageLayout from './components/ManageLayout';
import CreateEditHospital from './container/Hospital/CreateEditHospital';
import CreateEditBloodBank from './container/CreateEditBloodBank';
import ListHospital from './container/Hospital/ListHospital';
import HomePage from './container/Home';
import DetailHospital from './container/Hospital/DetailHospital';
import ListRequest from './container/Request/ListRequest';
import CreateEditRequest from './container/Request/CreateEditRequest';
import RequestDetail from './container/Request/RequestDetail';
import ListBloodInBloodBank from './container/Bloodbank';
import AddActiveForm from './container/Activities/AddActiveForm';

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
         path: '/manage',
         element: <ManageLayout />,
         children: [
            {
               path: '/manage/hospitals',
               element: <ListHospital />,
            },
            {
               path: '/manage/hospitals/:id',
               element: <DetailHospital />,
            },
            {
               path: '/manage/blood-bank',
               element: <CreateEditBloodBank />,
            },
            {
               path: '/manage/create-hospitals',
               element: <CreateEditHospital />,
            },
            {
               path: '/manage/requests',
               element: <ListRequest />,
            },
            {
               path: '/manage/requests/:id',
               element: <CreateEditRequest />,
            },
            {
               path: '/manage/requests/detail/:id',
               element: <RequestDetail />,
            },
            {
               path: '/manage/create-requests',
               element: <CreateEditRequest />,
            },
            {
               path: '/manage/list-blood',
               element: <ListBloodInBloodBank />,
            },
            {
               path: '/manage/create-activities',
               element: <AddActiveForm />,
            },
         ],
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
