import { Controller, useFormContext } from 'react-hook-form'
import { FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'

// import { AnyObject } from 'yup'
// import { useContext } from 'react'
// import { ValidationContext } from '../components/NewAccountForm'

const Select = ({
  name,
  label,
  required,
  options,
}: {
  name: string
  label: string
  required?: boolean
  options: { value: string; label: string }[]
}) => {
  const { control } = useFormContext()

  const generateSingleOptions = () => {
    return options.map((option: { value: string; label: string }) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      )
    })
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormControl required={required} error={!!error} fullWidth>
            <InputLabel id={label}>{label}</InputLabel>
            <MuiSelect id={label} onChange={onChange} value={value} label={label} variant='outlined'>
              {generateSingleOptions()}
            </MuiSelect>
            <FormHelperText>{error ? error.message : ' '}</FormHelperText>
          </FormControl>
        )
      }}
    />
  )
}
export default Select