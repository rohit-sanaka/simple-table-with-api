import { Controller, useFormContext } from 'react-hook-form'
import { TextField as MuiTextField, FormHelperText, FormControl } from '@mui/material'

// import { AnyObject } from 'yup'
// import { useContext } from 'react'
// import { ValidationContext } from '../components/NewAccountForm'

const TextField = ({ name, label, required }: { name: string; label: string; required?: boolean }) => {
  const {
    control,
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            <MuiTextField
              error={!!error}
              onChange={onChange}
              required={required}
              value={value}
              label={label}
              fullWidth
              variant='outlined'
            />
            <FormHelperText error={!!error}>{error ? error.message : ' '}</FormHelperText>
          </FormControl>
        )
      }}
    />
  )
}
export default TextField
