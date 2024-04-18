import CropRotateOutlinedIcon from '@mui/icons-material/CropRotateOutlined';

interface ImageRotationProps {
  rotation: number;
  setRotation: (rotation: number) => void;
}

const ImageRotation = ({ rotation, setRotation }: ImageRotationProps) => (
  <CropRotateOutlinedIcon
    sx={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      color: '#ffffff',
      zIndex: 999,
      mr: 1,
      mb: 1,
      cursor: 'pointer',
    }}
    onClick={() => {
      if (rotation === 360) {
        setRotation(90);
      } else {
        setRotation(rotation + 90);
      }
    }}
  />
);

export default ImageRotation;
