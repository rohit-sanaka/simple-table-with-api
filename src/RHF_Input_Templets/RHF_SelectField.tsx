import { Controller, useFormContext } from 'react-hook-form'
import { FormControl, FormHelperText, TextField, InputLabel, MenuItem } from '@mui/material'

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
        <MenuItem key={option.label} value={option.value}>
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
            {/* <InputLabel id={label}>{label}</InputLabel> */}
            <TextField
              select
              onChange={onChange}
              value={value}
              label={label}
              variant='standard'
              fullWidth
            >
              {generateSingleOptions()}
            </TextField>
            <FormHelperText>{error ? error.message : ' '}</FormHelperText>
          </FormControl>
        )
      }}
    />
  )
}
export default Select
