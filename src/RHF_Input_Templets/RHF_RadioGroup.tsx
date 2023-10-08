import { Controller, useFormContext } from 'react-hook-form'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, RadioGroup, Radio as MuiRadio } from '@mui/material'

const Radio = ({
  name,
  label,
  required,
  options,
  direction,
}: {
  name: string
  label: string
  required?: boolean
  options: { value: string; label: string }[]
  direction: string
}) => {
  const { control } = useFormContext()

  const generateSingleOptions = () => {
    return options.map((option: { value: string; label: string }) => {
      return <FormControlLabel key={option.value} value={option.value} control={<MuiRadio />} label={option.label} />
    })
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormControl required={required} error={!!error} fullWidth>
            <FormLabel id={label}>{label}</FormLabel>
            <RadioGroup aria-labelledby={label} name={name} value={value} onChange={onChange} row={direction === 'row'}>
              {generateSingleOptions()}
            </RadioGroup>
            <FormHelperText>{error ? error.message : ' '}</FormHelperText>
          </FormControl>
        )
      }}
    />
  )
}
export default Radio
