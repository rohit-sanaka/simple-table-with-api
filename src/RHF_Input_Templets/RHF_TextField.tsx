import { Controller, useFormContext } from 'react-hook-form'
import { TextField as MuiTextField, FormHelperText } from '@mui/material'

// import { AnyObject } from 'yup'
// import { useContext } from 'react'
// import { ValidationContext } from '../components/NewAccountForm'

const TextField = ({ name, label, required }: { name: string; label: string; required?: boolean }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  // const validationSchema = useContext(ValidationContext)
  // const required =
  // validationSchema?.fields[name]?.tests?.some((test: AnyObject) => test?.OPTIONS?.name === 'required') ||
  // false

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <MuiTextField
              error={!!error}
              onChange={onChange}
              required={required}
              value={value}
              label={label}
              fullWidth
              variant='outlined'
            />
            <FormHelperText error={!!error}>{error ? error.message : ''}</FormHelperText>
          </>
        )
      }}
    />
  )
}
export default TextField
