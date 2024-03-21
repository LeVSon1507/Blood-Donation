import {
   AppBar,
   Toolbar,
   Box,
   List,
   Typography,
   styled,
   ListItemButton,
   ListItemText,
   IconButton,
   Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DrawerItem from '../../container/LandingView/DrawerItem';
import { useState } from 'react';
import { Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import './Header.scss';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import logo1 from 'src/assets/images/undraw_doctors_p6aq.svg';
import { url_img } from '../../utils/const';

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

const itemList = [
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
      text: 'Trang cá nhân',
      to: '/profile',
   },
];

// const LOGOUT_CONTENT = 'Do you want to logout?';

const Navbar = props => {
   const { isAdmin } = props || {};
   const navigate = useNavigate();
   const [anchorEl, setAnchorEl] = useState<boolean>(false);

   const goToLandingPage = () => {
      navigate('/');
   };

   const handleClose = () => {
      setAnchorEl(false);
   };

   const goToDashBoard = () => {
      navigate('/home');
   };

   //  const onConfirm = () => {
   //     navigate('/auth');
   //  };

   return (
      <AppBar
         component='nav'
         position={`${isAdmin ? 'fixed' : 'fixed'}`}
         sx={{
            backgroundColor: 'orange',
         }}
         elevation={0}
      >
         <StyledToolbar>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  alignItems: 'center',
               }}
               onClick={isAdmin ? goToDashBoard : goToLandingPage}
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
            {!isAdmin ? (
               <ListMenu>
                  {itemList.map(item => {
                     const { text } = item;
                     return (
                        <Button
                           sx={{ backgroundColor: '#811315', mr: 1, borderRadius: 3 }}
                           key={text}
                        >
                           <ListItemButton
                              component={Link}
                              to={item.to}
                              sx={{
                                 color: '#fff',
                                 '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: '#1e2a5a',
                                 },
                              }}
                           >
                              <ListItemText primary={text} />
                           </ListItemButton>
                        </Button>
                     );
                  })}
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
                     transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                     anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                     <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                           <Avatar src={url_img} alt='avatar' />
                        </ListItemIcon>
                        Profile Infor
                     </MenuItem>
                     <Divider />
                     <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                           <Settings fontSize='small' />
                        </ListItemIcon>
                        Settings
                     </MenuItem>
                     <MenuItem onClick={() => {}}>
                        <ListItemIcon>
                           <Logout fontSize='small' />
                        </ListItemIcon>
                        Logout
                     </MenuItem>
                  </Menu>
               </Box>
            )}
         </StyledToolbar>
      </AppBar>
   );
};

export default Navbar;
