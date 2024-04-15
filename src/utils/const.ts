import dayjs from 'dayjs';
import _ from 'lodash';
import { ToastError } from './toastOptions';

export const url_img =
   'https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg';

export const article_endpoint = `https://newsdata.io/api/1/news?apikey=pub_4058515151c616834f37ed50f02107c4e64cf&country=vi&language=vi&category=health`;

export const token = localStorage.getItem('token');

const isImage = ['png', 'jpg', 'svg', 'webp', 'jpeg'];

export const handleImageUpload = (image, setImageUrl) => {
   const data = new FormData();
   for (let i = 0; i < image?.length; i++) {
      const fileExtension = image[i].name.split('.').pop().toLowerCase();
      if (isImage.includes(`${fileExtension}`)) {
         data.append('file', image[i]);
         data.append('upload_preset', `upload`);
         data.append('cloud_name', 'lvson');
         fetch('https://api.cloudinary.com/v1_1/lvson/image/upload', {
            method: 'post',
            body: data,
         })
            .then(res => res.json())
            .then(data => {
               setImageUrl(data?.url);
            })
            .catch(err => {
               console.log(err);
            });
      } else {
         setImageUrl('err');
         ToastError(`Invalid file extension: ${fileExtension}`);
      }
   }
};

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
