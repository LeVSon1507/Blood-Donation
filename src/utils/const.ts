//TODO: import image local
import _ from 'lodash';

export const url_img =
   'https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg';

export const token = localStorage.getItem('token');

export const isLogin =
   !_.isEmpty(localStorage.getItem('token')) &&
   !_.isEmpty(localStorage.getItem('userId')) &&
   !_.isEmpty(localStorage.getItem('currentUser'));

export const SECTION_STYLES = {
   backgroundColor: '#ffffff',
   borderRadius: '8px',
   boxShadow: '0px 1px 2px 0px rgba(10, 10, 10, 0.06)',
   padding: '16px',
};

export const PRIMARY_COLOR = '#811315';
