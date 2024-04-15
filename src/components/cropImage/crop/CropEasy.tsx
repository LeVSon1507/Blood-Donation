import { Cancel } from '@mui/icons-material';
import CropIcon from '@mui/icons-material/Crop';
import { Box, Button, DialogActions, DialogContent, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './utils/cropImage';
import { ToastError } from 'src/utils/toastOptions';

const CropEasy = ({
  photoURL,
  setOpenCrop,
  onCancel,
  setIsCropped,
  setIsOpenModalCrop,
  setPhotoURL,
  setFile,
  setLoading,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    setLoading(true);
    try {
      const { file, url }: any = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation,
        { horizontal: false, vertical: false },
        setPhotoURL,
      );
      setPhotoURL(url);
      setFile(file);
      setIsOpenModalCrop(false);
      setIsCropped(true);
      setOpenCrop(false);
    } catch (error) {
      ToastError(error);
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <Box sx={{ mx: 3, my: 2 }}>
      <DialogContent
        dividers
        sx={{
          background: '#333',
          position: 'relative',
          width: 'auto',
          height: '500px',
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
        <Box sx={{ width: '100%', mb: 1 }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom: any) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + '°'}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation: any) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => {
              setOpenCrop(false);
              onCancel?.();
            }}
          >
            Skip
          </Button>
          <Button variant="contained" startIcon={<CropIcon />} onClick={cropImage}>
            Crop
          </Button>
        </Box>
      </DialogActions>
    </Box>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
