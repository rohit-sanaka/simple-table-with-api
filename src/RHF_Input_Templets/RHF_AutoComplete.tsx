import { Controller, useFormContext } from 'react-hook-form'
import { TextField, FormHelperText, FormControl, Box, Autocomplete as MuiAutoComplete } from '@mui/material'

type TextFieldProps = {
  name: string
  label: string
  required?: boolean
  helperText?: string
  options: { value: string; label: string }[]
}

const AutoComplete = ({ name, label, required, options, helperText = ' ' }: TextFieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            <MuiAutoComplete
              value={value}
              renderOption={(props, option) => {
                console.log(option)
                return <Box component='li' {...props}>{`${option.label} : ( ${option.value} )`}</Box>
              }}
              isOptionEqualToValue={(option, value) => {
                return option.value === value
              }}
              onChange={(_event, newValue: { label: string; value: string } | null) => {
                onChange(newValue?.value)
              }}
              options={options}
              fullWidth              
              renderInput={(params) => (
                <TextField
                  {...params}
                  name={name}
                  required={required}
                  label={label}
                  error={!!error}
                  value={value}
                  onChange={onChange}
                  variant='standard'
                  fullWidth
                />
              )}
            />
            <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
          </FormControl>
        )
      }}
    />
  )
}
export default AutoComplete
