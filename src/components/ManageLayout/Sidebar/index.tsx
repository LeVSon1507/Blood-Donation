import React from 'react';
import { MdOutlineMapsHomeWork } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'src/context';

const items = [
   {
      icon: <MdOutlineMapsHomeWork />,
      title: 'Hospitals',
      path: '/manage/hospitals',
   },
   {
      icon: <HiOutlineUsers />,
      title: 'Blood Bank',
      path: '/manage/blood-bank',
   },
   {
      icon: <MdOutlineBusinessCenter />,
      title: 'Request',
      path: '/manage/requests',
   },
];

const Sidebar = () => {
   const { user } = useAuth();

   return (
      <div className='w-[300px] h-full shadow-lg flex flex-col pt-5  items-center  text-slate-500 bg-white'>
         <div className='flex flex-col w-full items-center mt-10'>
            {items.map(item => {
               return (
                  <NavLink
                     to={item.path}
                     key={item.path}
                     className={({ isActive }) =>
                        `w-full h-11 font-semibold cursor-pointer flex flex-row items-center justify-start pl-4 hover:border-primary border-l-4 gap-5 hover:text-primary  ${
                           isActive
                              ? ' hover:text-primary text-red-800 border-l-primary'
                              : 'text-slate-500 hover:border-l-noColor border-l-noColor '
                        }`
                     }
                  >
                     <span className='text-2xl text-primay'>{item.icon}</span>
                     <span>{item.title}</span>
                  </NavLink>
               );
            })}
         </div>
         <div className='user mt-auto w-full h-[70px] flex flew-row gap-3 items-center px-1 py-3 border-t-slate-300 border-t'>
            <div className='w-11 h-11'>
               <img
                  src='https://images.unsplash.com/photo-1668086620216-851f13fbce3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
                  alt=''
                  className='w-full h-full object-cover rounded-full'
               />
            </div>
            <div className='flex flex-col text-slate-600'>
               <span className='font-semibold'>{user?.email || 'dat@gmail.com'}</span>
               <span className='text-sm'>{'Admin'}</span>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
