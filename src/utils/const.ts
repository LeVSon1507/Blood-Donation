//TODO: import image local
import dayjs from 'dayjs';
import _ from 'lodash';

export const url_img =
   'https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg';

export const article_endpoint = `https://newsdata.io/api/1/news?apikey=pub_4058515151c616834f37ed50f02107c4e64cf&country=vi&language=vi&category=health`;

export const token = localStorage.getItem('token');

export const isEmpty = (value: any): boolean =>
   value instanceof Date
      ? !dayjs(value).isValid()
      : !value ||
        value === undefined ||
        value === null ||
        Number.isNaN(value) ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value === '') ||
        (Array.isArray(value) && value.length === 0);

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
