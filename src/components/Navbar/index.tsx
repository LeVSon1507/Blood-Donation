import {
   AppBar,
   Toolbar,
   Box,
   List,
   Typography,
   styled,
   ListItemButton,
   IconButton,
   Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DrawerItem from '../../container/LandingView/DrawerItem';
import { useEffect, useState } from 'react';
import { Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import './Header.scss';
import logo1 from 'src/assets/images/undraw_doctors_p6aq.svg';
import { url_img } from '../../utils/const';
import DialogCommon from '../DialogCommon/DialogCommon';
import { Role, getCurrentUser, http } from 'src/utils';
import { IoMenu } from 'react-icons/io5';
import { MdNotificationsActive } from 'react-icons/md';
import NotificationList from './Notification';

const StyledToolbar = styled(Toolbar)({
   display: 'flex',
   justifyContent: 'space-between',
   backgroundColor: 'black',
});

const ListMenu = styled(List)(({ theme }) => ({
   display: 'none',
   backgroundColor: 'black',
   [theme.breakpoints.up('sm')]: {
      display: 'flex',
   },
}));

const itemList = (isLogin: boolean, isAdmin: boolean) => [
   {
      text: 'Trang Chủ',
      to: '/home',
   },
   {
      text: 'Hỏi Đáp',
      to: '/qa',
   },
   {
      text: 'Tin Tức',
      to: '/news',
   },
   {
      text: 'Liên Hệ',
      to: '/contact-us',
   },
   {
      text: 'Trang Admin',
      to: '/manage',
      isHidden: !isAdmin,
   },
   {
      text: !isLogin ? 'Đăng Nhập' : 'Trang cá nhân',
      to: !isLogin ? '/login' : '/profile',
   },
];

const Navbar = props => {
   const { isAdmin } = props || {};
   const navigate = useNavigate();
   const [anchorEl, setAnchorEl] = useState<boolean>(false);
   const [open, setOpen] = useState<boolean>(false);
   const currentUser = getCurrentUser();
   const [showBtn, setShowBtn] = useState<boolean>(false);
   const [showNotification, setShowNotification] = useState<boolean>(false);
   const [notificationCount, setNotificationCount] = useState<number>(0);
   const [notificationList, setNotificationList] = useState<Notification[]>([]);
   const [maskRead, setMaskRead] = useState<boolean>(false);

   useEffect(() => {
      http
         .get(`volunteer/notification?id=${currentUser?.userId}`)
         .then(res => {
            setNotificationList(res?.data?.data || []);
         })
         .catch(err => {
            console.log(err);
         });
      http
         .get(`volunteer/countnotification?id=${currentUser?.userId}`)
         .then(res => {
            setNotificationCount(res?.data?.data || 0);
         })
         .catch(err => {
            console.log(err);
         });
   }, [currentUser?.userId, maskRead]);

   const isRoleAdmin =
      currentUser?.role === Role.Admin ||
      currentUser?.role === Role.BloodBank ||
      currentUser?.role === Role.Hospital;

   const goToLandingPage = () => {
      navigate('/');
   };

   const handleClose = () => {
      setAnchorEl(false);
   };

   const goToDashBoard = () => {
      isRoleAdmin ? navigate('/manage') : navigate('/home');
   };

   const isLogin = !!localStorage.getItem('token') && !!localStorage.getItem('userId');

   const onClickAva = () => {
      if (isLogin) {
         isRoleAdmin ? navigate('/manage') : navigate('/home');
      } else {
         navigate('/login');
      }
   };

   const onLogin = () => {
      navigate('/login');
   };

   const onLogout = () => {
      localStorage.clear();
      navigate('/login');
   };

   const handleLoginLogout = () => {
      isLogin ? setOpen(true) : onLogin();
   };

   return (
      <AppBar
         component='nav'
         position={`${isAdmin ? 'fixed' : 'sticky'}`}
         sx={{
            backgroundColor: 'orange',
         }}
         elevation={0}
      >
         <StyledToolbar className='menu-bar'>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  alignItems: 'center',
               }}
               onClick={isRoleAdmin ? goToDashBoard : goToLandingPage}
            >
               <img
                  src={logo1}
                  alt='logoT'
                  width={40}
                  height={40}
                  style={{
                     backgroundColor: 'white',
                     padding: 8,
                     borderRadius: 50,
                     marginRight: 12,
                  }}
               />
               <Typography variant='h6' component='h2'>
                  Giọt Máu Hồng
               </Typography>
            </Box>

            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
               <DrawerItem />
            </Box>

            {showBtn ? (
               <ListMenu>
                  {itemList(isLogin, isRoleAdmin).map(item => {
                     const { text, isHidden } = item;
                     if (isHidden) return null;
                     return (
                        <Button
                           sx={{ backgroundColor: '#811315', mr: 1, borderRadius: 3 }}
                           key={text}
                        >
                           <ListItemButton
                              component={Link}
                              to={item.to}
                              className=' h-[40px]'
                              sx={{
                                 color: '#fff',
                                 '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: '#1e2a5a',
                                 },
                              }}
                           >
                              <Typography
                                 className='d-flex text-center align-items-center '
                                 variant='subtitle2'
                                 sx={{ color: '#fff' }}
                              >
                                 {text}
                              </Typography>
                           </ListItemButton>
                        </Button>
                     );
                  })}
                  <Box
                     className='d-flex align-items-center flex-end'
                     sx={{ cursor: 'pointer' }}
                     onClick={() => setShowBtn(prev => !prev)}
                  >
                     <IoMenu size={30} />
                  </Box>

                  {isLogin && <Button onClick={handleLoginLogout}>{'Đăng Xuất'}</Button>}
                  <DialogCommon
                     content='Bạn có muốn đăng xuất không?'
                     onClose={() => setOpen(false)}
                     open={open}
                     onConfirm={onLogout}
                  />
               </ListMenu>
            ) : (
               <Box className='menu-bar'>
                  <IconButton onClick={() => setAnchorEl(true)}>
                     <Avatar
                        sx={{
                           width: 32,
                           height: 32,
                        }}
                        src={url_img}
                        alt='avatar'
                     />
                  </IconButton>
                  <Menu
                     id='account-menu'
                     open={anchorEl}
                     onClose={handleClose}
                     onClick={handleClose}
                     PaperProps={{
                        elevation: 0,
                        className: 'custom-paper_admin',
                     }}
                     className='mr-3'
                     transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                     anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                  >
                     <MenuItem
                        onClick={() => {
                           onClickAva();
                           handleClose();
                        }}
                     >
                        <ListItemIcon className='mr-3'>
                           <Avatar src={url_img} alt='avatar' />
                        </ListItemIcon>
                        {currentUser?.email ?? 'Login'}
                     </MenuItem>
                     <Divider />
                     <MenuItem
                        onClick={() => {
                           handleClose();
                           setShowBtn(prev => !prev);
                        }}
                     >
                        <ListItemIcon>
                           <IoMenu size={30} />
                        </ListItemIcon>
                        Menu
                     </MenuItem>
                     {isLogin && (
                        <MenuItem
                           onClick={() => {
                              handleClose();
                              setShowNotification(prev => !prev);
                           }}
                        >
                           <ListItemIcon>
                              <MdNotificationsActive
                                 size={26}
                                 color={notificationCount !== 0 ? 'orange' : ''}
                              />
                           </ListItemIcon>
                           Notification ({notificationCount})
                        </MenuItem>
                     )}
                  </Menu>
               </Box>
            )}
            <NotificationList
               open={showNotification}
               setOpen={setShowNotification}
               maskRead={maskRead}
               setMaskRead={setMaskRead}
               data={notificationList}
            />
         </StyledToolbar>
      </AppBar>
   );
};

export default Navbar;
