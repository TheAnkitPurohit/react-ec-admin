/* eslint-disable consistent-return */
import Cropper from 'react-easy-crop';
import { useDropzone } from 'react-dropzone';
import { getOrientation } from 'get-orientation';
import { Area, Point } from 'react-easy-crop/types';
import { useState, useEffect, useCallback } from 'react';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUploadOutlined';
import { Box, Dialog, Typography, DialogTitle, DialogContent } from '@mui/material';

import ImageRotation from './ImageRotation';
import ImageZoomSlider from './ImageZoomSlider';
import UploadImageModalFooter from './UploadImageModalFooter';
import {
  readFile,
  urlToFile,
  getCroppedImg,
  getRotatedImage,
  ORIENTATION_TO_ANGLE,
} from './CanvasUtils';

interface UploadImageProps {
  isOpen: boolean;
  onClose: () => void;
  setImage: any;
  setImageUrl: any;
  isRound?: boolean;
}

const UploadImageModal = ({
  isOpen,
  onClose,
  setImage,
  setImageUrl,
  isRound,
}: UploadImageProps) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  // onDrop
  const onDrop = useCallback(async (acceptedFiles: any) => {
    if (acceptedFiles && acceptedFiles.length < 0) {
      return;
    }
    const file = acceptedFiles[0];

    const fileRestriction = file.size / (1024 * 1024) > 15;

    if (fileRestriction) {
      // toast({
      //     title: t("assets.photo_warning"),
      //     status: "error",
      //     duration: 9000,
      //     isClosable: true,
      //     position: "top-right"
      // });
      return onClose();
    }
    let imageDataUrl: any = await readFile(file);
    try {
      const orientation: any = await getOrientation(file);
      const newRotation = ORIENTATION_TO_ANGLE[orientation];
      if (newRotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, newRotation);
      }
    } catch (e) {
      console.warn('failed to detect the orientation');
    }
    setImageSrc(imageDataUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (!isOpen) {
      setImageSrc(null);
    }
  }, [isOpen]);

  // onCropComplete
  const onCropComplete = useCallback((croppedArea: Area, newCroppedAreaPixels: Area) => {
    setCroppedAreaPixels(newCroppedAreaPixels);
  }, []);

  // showCroppedImage
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      console.log({ croppedImage });

      const imageFile = urlToFile(croppedImage);
      console.log({ imageFile });
      setImage(imageFile);
      onClose();
      setImageUrl(croppedImage);
      setRotation(0);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <DialogTitle>Upload Image</DialogTitle>
        <CloseOutlinedIcon
          sx={{
            cursor: 'pointer',
            mr: '24px',
          }}
          onClick={onClose}
        />
      </Box>

      {!imageSrc ? (
        <DialogContent
          sx={{
            position: 'relative',
            width: '100%',
            mb: 2,
          }}
        >
          <Box
            {...getRootProps()}
            sx={{
              bgcolor: '#0000000a',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                border: isDragActive ? '1px' : '',
                borderStyle: isDragActive ? 'dashed' : '',
                minHeight: '50vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <input {...getInputProps()} accept="image/png, image/jpeg" />

              {isDragActive ? (
                <Typography>uploading...</Typography>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingX: 5,
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: '5rem' }} />
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                    variant="h3"
                  >
                    Add A Photo
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: 'center',
                    }}
                    variant="body1"
                  >
                    Drag and drop photo or click the button below to select a photo you’d like to
                    upload.
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: 'center',
                    }}
                    variant="body1"
                  >
                    These photos must be in JPEG, or PNG format, be less than 15MB in size
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
      ) : (
        <>
          <DialogContent
            sx={{
              position: 'relative',
              width: '100%',
              mb: 2,
            }}
          >
            <Box
              className="cropContainer"
              sx={{
                width: '100%',
                height: '516px',
                position: 'relative',
              }}
            >
              <ImageRotation rotation={rotation} setRotation={setRotation} />
              <Cropper
                image={imageSrc}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={isRound && isRound ? 1 : 1 / 1}
                cropShape={isRound ? 'round' : 'rect'}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </Box>
            <ImageZoomSlider zoom={zoom} setZoom={setZoom} />
          </DialogContent>

          <UploadImageModalFooter
            onClose={() => {
              onClose();
              setRotation(0);
            }}
            onSave={showCroppedImage}
          />
        </>
      )}
    </Dialog>
  );
};

export default UploadImageModal;
