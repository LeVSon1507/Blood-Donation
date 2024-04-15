import { useEffect, useRef } from 'react';

const UploadWidget = ({ setImageUrl, currentUploadImageUrlRef, widgetRef }) => {
   const cloudinaryRef = useRef();
   useEffect(() => {
      // @ts-ignore
      cloudinaryRef.current = window.cloudinary;
      // @ts-ignore
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
         {
            cloud_name: 'lvson',
            upload_preset: 'upload',
         },
         function (error, result) {
            console.log('🚀 ~ useEffect ~ result:', result);

            if (result?.info !== 'hidden') {
               const secureUrl = result?.info?.files?.[0]?.uploadInfo?.secure_url;
               setImageUrl(secureUrl);
               currentUploadImageUrlRef.current = secureUrl;
            }
         }
      );
   }, []);

   // @ts-ignore
   return null;
};

export default UploadWidget;
