import React from 'react';
import { MdBloodtype, MdOutlineMapsHomeWork, MdOutlineVolunteerActivism } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Role, User, getCurrentUser } from 'src/utils';

const Sidebar = () => {
   const currentUser = JSON.parse(localStorage.getItem('currentUser')) as unknown as User;
   const isAdmin = currentUser?.role === Role.Admin;
   const isHospital = currentUser?.role === Role.Hospital;
   const isManager = currentUser?.role === Role.BloodBank;

   const items = [
      {
         icon: <MdOutlineMapsHomeWork />,
         title: 'Bệnh Viện',
         path: isHospital ? `/manage/hospitals/${currentUser?.userId}` : '/manage/hospitals',
         isDisplay: isManager || isHospital || isAdmin,
      },
      {
         icon: <HiOutlineUsers />,
         title: 'Ngân hàng máu',
         path: '/manage/blood-bank',
         isDisplay: isAdmin,
      },
      {
         icon: <MdOutlineBusinessCenter />,
         title: 'Yêu cầu',
         path: '/manage/requests',
         isDisplay: isAdmin || isManager || isHospital,
      },
      {
         icon: <MdBloodtype />,
         title: 'Kho Máu',
         path: '/manage/list-blood',
         isDisplay: isManager || isHospital,
      },
      {
         icon: <MdOutlineVolunteerActivism />,
         title: 'Hoạt động',
         path: '/manage/create-activities',
         isDisplay: isAdmin,
      },
   ];

   const itemsValid = items?.filter(item => item?.isDisplay);

   const user = getCurrentUser();

   const handleRenderRole = (role: Role) => {
      if (role === Role.Admin) {
         return 'Admin';
      }
      if (role === Role.Hospital) {
         return 'Bệnh Viện';
      }
      if (role === Role.BloodBank) {
         return 'Kho máu';
      }
   };

   return (
      <div className='w-[300px] h-full shadow-lg flex flex-col pt-5  items-center  text-slate-500 bg-white'>
         <div className='flex flex-col w-full items-center mt-10'>
            {itemsValid.map(item => {
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
               <span className='font-semibold'>{user?.email || 'admin-email@gmail.com'}</span>
               <span className='text-sm'>{handleRenderRole(user?.role)}</span>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
