/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useRef, useState } from 'react';
import { Box, Dialog, DialogContent, Skeleton, Typography } from '@mui/material';
import './ImageUpload.scss';
import CropEasy from 'src/components/cropImage/crop/CropEasy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { handleImageUpload } from 'src/utils';

interface Props {
   selectedImage: string;
   setSelectedImage: (any) => void;
   isOpenModalCrop: boolean;
   setIsOpenModalCrop: (any) => void;
   setLoading?: (any) => void;
}

const ImageUpload: FC<Props> = ({
   isOpenModalCrop,
   setIsOpenModalCrop,
   selectedImage,
   setSelectedImage,
   setLoading,
}) => {
   const fileInputRef = useRef(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isOpenCrop, setIsOpenCrop] = useState(false);
   const [isCropped, setIsCropped] = useState(false);
   const [file, setFile] = useState(null);
   const [isEditingImage, setIsEditingImage] = useState(false);

   const handleClose = () => {
      setIsOpenModalCrop(false);
   };

   const handleLinkClick = () => {
      fileInputRef.current.click();
   };

   useEffect(() => {
      if (selectedImage !== '') {
         setLoading(false);
         setIsLoading(false);
      }
   }, [selectedImage, setLoading]);

   return (
      <>
         <Box className='add_image_icon-text-qa'>
            {(!isEditingImage || !selectedImage) && (
               <>
                  <Box className='add_image_icon-text-qa__box'>
                     <Typography
                        sx={{ display: 'flex', color: '#8e6e51', fontWeight: 'bold', mr: 1 }}
                     >
                        Edit Avatar:
                     </Typography>
                     <Box className='add_image_icon-text-qa__box__group' onClick={handleLinkClick}>
                        <CloudUploadIcon className='add_image_icon-text-qa__box__group__icon' />
                     </Box>
                  </Box>
                  <input
                     type='file'
                     ref={fileInputRef}
                     style={{ display: ' none' }}
                     onChange={e => {
                        handleImageUpload(e.target.files, setSelectedImage);
                        setIsOpenModalCrop(true);
                        setIsEditingImage(true);
                        setIsLoading(true);
                     }}
                  />
               </>
            )}

            <Dialog open={isOpenModalCrop} onClose={handleClose}>
               <DialogContent>
                  {isLoading ? (
                     <Skeleton
                        sx={{ height: '500px', width: '500px' }}
                        animation='wave'
                        variant='rectangular'
                     />
                  ) : (
                     isEditingImage && (
                        <Box>
                           <CropEasy
                              setFile={setFile}
                              photoURL={selectedImage}
                              setIsCropped={setIsCropped}
                              setIsOpenModalCrop={setIsOpenModalCrop}
                              onCancel={handleClose}
                              setLoading={setIsLoading}
                              setPhotoURL={setSelectedImage}
                              setOpenCrop={() => setIsOpenCrop(true)}
                           />
                        </Box>
                     )
                  )}
               </DialogContent>
            </Dialog>
         </Box>
      </>
   );
};

export default ImageUpload;
