import { TextField } from '@mui/material'

interface TextInputTypes {
  name: string;
}

const TextInputField = ({name}: TextInputTypes) => (
        <TextField id="outlined-basic" variant="outlined" fullWidth sx={{width:'280px'}} size='small' name={name}/>
  )

export default TextInputField
