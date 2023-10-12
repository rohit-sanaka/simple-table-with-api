import { Controller, useFormContext } from 'react-hook-form'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'

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
        <MenuItem
          key={option.label}
          value={option.value}
        >
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
            <InputLabel id={label} sx={{ pt: 0.5 }}>
              {label}
            </InputLabel>
            <MuiSelect
              id={label}
              onChange={onChange}
              value={value}
              label={label}
              variant='standard'
              fullWidth
            >
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
