import { LoadingButton } from '@mui/lab';

interface FormSubmitBtnTypes {
  isSubmitting?: boolean;
  name: string;
  isDisabled?: boolean;
  handleClick?: any;
  BtnType?: 'submit' | 'button';
  BtnWidth?: string;
  BtnHeight?: string;
  BackGroundColor?: string;
}

const FormSubmitBtn = ({
  BtnType,
  isSubmitting,
  name,
  isDisabled,
  handleClick,
  BtnWidth,
  BtnHeight,
  BackGroundColor,
}: FormSubmitBtnTypes) => (
  <LoadingButton
    sx={{
      height: BtnHeight ?? 'auto',
      width: BtnWidth ?? 'fit-content',
      opacity: 1,
      background: BackGroundColor ?? '#000000',
      '&:hover': {
        background: BackGroundColor ?? '#000000',
        opacity: 0.8,
      },
    }}
    disabled={isDisabled}
    fullWidth
    color="inherit"
    size="large"
    type={BtnType ?? 'submit'}
    variant="contained"
    loading={isSubmitting}
    onClick={handleClick}
  >
    {name}
  </LoadingButton>
);

export default FormSubmitBtn;
