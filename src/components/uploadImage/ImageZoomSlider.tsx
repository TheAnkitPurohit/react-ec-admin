import { BiZoomIn, BiZoomOut } from 'react-icons/bi';

import { Stack, Slider } from '@mui/material';

interface ImageZoomSliderProps {
  zoom: number;
  setZoom: (zoom: number) => void;
}

const ImageZoomSlider = ({ zoom, setZoom }: ImageZoomSliderProps) => (
  <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
    <BiZoomOut />
    <Slider
      aria-label="Volume"
      value={zoom}
      onChange={() => {
        setZoom(zoom + 1);
      }}
    />
    <BiZoomIn />
  </Stack>
);

export default ImageZoomSlider;
