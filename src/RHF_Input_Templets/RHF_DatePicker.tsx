import { Controller, useFormContext } from 'react-hook-form'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { FormHelperText } from '@mui/material'
import { Fragment } from 'react'
import { parseISO } from 'date-fns/esm'

const DatePicker = ({ name, label, required }: { name: string; label: string; required?: boolean }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        value = typeof value === 'string' ? parseISO(value) : value
        return (
          <Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MuiDatePicker
                label={label}
                value={value}
                onChange={onChange}
                disableFuture
                format='dd/MM/yyyy'
                formatDensity='dense'
                slotProps={{
                  textField: {
                    label: label,
                    required: required,
                    fullWidth: true,
                    error: !!error,
                    variant: 'standard',
                  },
                }}
              />
            </LocalizationProvider>
            <FormHelperText error={!!error}>{error ? error.message : ' '}</FormHelperText>
          </Fragment>
        )
      }}
    />
  )
}
export default DatePicker
