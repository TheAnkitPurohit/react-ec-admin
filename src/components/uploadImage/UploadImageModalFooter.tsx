import { Button, DialogActions } from '@mui/material';

interface UploadImageModalFooterProps {
  onClose: () => void;
  onSave: () => void;
}

const UploadImageModalFooter = ({ onSave, onClose }: UploadImageModalFooterProps) => (
  <DialogActions
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: 1,
    }}
  >
    <Button onClick={onClose}>Cancel</Button>

    <Button onClick={onSave}>Save Photo</Button>
  </DialogActions>
);

export default UploadImageModalFooter;
