import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect } from 'react';
import { User } from './types';
import { ToastError } from './toastOptions';
import { getDistrictByCode, getProvinceByCode, getWardByCode } from './Address';
import { isEmpty } from './const';

export const useScrollTop = () => {
   useEffect(() => {
      const scrollToTop = () => {
         window.scrollTo({
            top: 0,
            behavior: 'smooth',
         });
      };
      scrollToTop();
   }, []);
};

export const formatDate = (value: string, format: string = 'MM/DD/YYYY') => {
   if (!value) return '';

   return dayjs(value).format(format);
};

export const formatYear = (value: string, format: string = 'YYYY') => {
   if (!value) return '';

   return dayjs(value).format(format);
};

export const formatDateTime = (value: string, format: string = 'YYYY-MM-DD') => {
   if (!value) return '';
   return dayjs(value).format(format);
};

export const formatDateUserInfor = (value: string, format: string = 'YYYY-MM-DD') => {
   if (!value) return '';

   return dayjs(value).format(format);
};
const isImage = ['png', 'jpg', 'svg', 'webp', 'jpeg'];

export const handleImageUpload = (image, setImageUrl, isPost: boolean) => {
   const data = new FormData();
   for (let i = 0; i < image.length; i++) {
      const fileExtension = image[i].name.split('.').pop().toLowerCase();
      if (isImage.includes(`${fileExtension}`)) {
         data.append('file', image[i]);
         data.append('upload_preset', `image_giotmauhong`);
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
export const formatTime = (time: string) => {
   const currentTime = new Date();
   const preTime = new Date(time);
   const result = currentTime.getTime() - preTime.getTime();
   const seconds = Math.floor(result / 1000);
   const minutes = Math.floor(result / 1000 / 60);
   const hours = Math.floor(result / 1000 / 60 / 60);
   const days = Math.floor(result / 1000 / 60 / 60 / 24);
   const months = Math.floor(result / 1000 / 60 / 60 / 24 / 30);

   if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
   } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
   } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
   } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
   } else if (seconds > 0) {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
   } else {
      return 'Just now';
   }
};
export const formatTimeMessage = (time: string) => {
   const currentTime = new Date();
   const preTime = new Date(time);
   const result = currentTime.getTime() - preTime.getTime();
   const seconds = Math.floor(result / 1000);
   const minutes = Math.floor(result / 1000 / 60);
   const hours = Math.floor(result / 1000 / 60 / 60);
   const days = Math.floor(result / 1000 / 60 / 60 / 24);
   const months = Math.floor(result / 1000 / 60 / 60 / 24 / 30);

   if (months > 0) {
      return `${months}m`;
   } else if (days > 0) {
      return `${days}d`;
   } else if (hours > 0) {
      return `${hours}h`;
   } else if (minutes > 0) {
      return `${minutes}m`;
   } else if (seconds > 0) {
      return `${seconds}s`;
   } else {
      return '0s';
   }
};

export const checkEmptyValueReturnArray = value => {
   if (
      _.isUndefined(value) ||
      _.isNull(value) ||
      _.isString(value) ||
      (_.isArray(value) && _.isEmpty(value))
   ) {
      return [];
   } else {
      return value;
   }
};

export const defaultColor = '#f7f3f0';

export const formatDatePost = (date: string) => {
   const dateObj = new Date(date);

   const day = dateObj.getDate();
   const monthIndex = dateObj.getMonth();
   const year = dateObj.getFullYear();

   const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
   ];

   return `${months[monthIndex]} ${day} ${year}`;
};

export const formatTimeAt = (date: string) => {
   const dateObj = new Date(date);
   const dateNow = new Date();

   const day = dateObj.getDate();
   const monthIndex = dateObj.getMonth();
   const year = dateObj.getFullYear();
   const hour = dateObj.getHours();
   const minute = dateObj.getMinutes();

   if (dateNow.getDate() - dateObj.getDate() < 1) {
      return `${hour}h:${minute}m`;
   }
   const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
   ];

   return `${day}-${months[monthIndex]}-${year} ${hour}h:${minute}m`;
};

export const formatStarRated = (value: number) => {
   if (value > 1000) {
      const newValue = Math.round(value / 1000);
      return `${newValue}k`;
   }
   return `${value}`;
};

export const responsive = {
   desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
   },
   tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
   },
   mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
   },
};

export type Callback = (...args: any[]) => void;

export const getCurrentUser = () => {
   return JSON.parse(localStorage.getItem('currentUser')) as unknown as User;
};

export const getFullAddress = (currentUser = getCurrentUser()) => {
   const { address, district, ward, city } = currentUser;

   if (isEmpty(address) && isEmpty(district) && isEmpty(ward) && isEmpty(city))
      return 'Chưa cập nhật địa chỉ!';

   return [
      address,
      getWardByCode(district)?.name,
      getDistrictByCode(ward)?.name,
      getProvinceByCode(city)?.name,
   ]
      .filter(item => item)
      .join(', ');
};
