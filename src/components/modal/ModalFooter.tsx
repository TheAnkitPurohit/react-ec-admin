import { Box, DialogActions } from '@mui/material';

import FormSubmitBtn from 'src/components/buttons/SubmitButton';

interface ModalFooterProps {
  handleClose: () => void;
  isSubmitting: boolean;
  isDisabled?: boolean;
  submitButtonText?: string;
  handleClick?: () => void;
}

const ModalFooter = ({
  handleClose,
  isSubmitting,
  isDisabled,
  submitButtonText,
  handleClick,
}: ModalFooterProps) => (
  <DialogActions>
    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 1 }}>
      <FormSubmitBtn
        name="Cancel"
        handleClick={handleClose}
        BtnType="button"
        BackGroundColor="#A3A3A3"
      />

      <FormSubmitBtn
        BackGroundColor="#4299e1"
        isSubmitting={isSubmitting}
        name={submitButtonText ?? 'Create'}
        isDisabled={isDisabled}
        handleClick={() => {
          if (handleClick) {
            handleClick();
          }
        }}
      />
    </Box>
  </DialogActions>
);

export default ModalFooter;
