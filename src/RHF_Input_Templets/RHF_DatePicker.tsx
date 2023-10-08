import { Controller, useFormContext } from 'react-hook-form'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { FormHelperText } from '@mui/material'
import * as date from 'date-fns'
import { Fragment } from 'react'

const DatePicker = ({ name, label, required }: { name: string; label: string; required?: boolean }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        console.log(value)
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Fragment>
              <MuiDatePicker
                label={label}
                value={value}
                onChange={onChange}
                onAccept={onChange}
                disableFuture
                slotProps={{ textField: { required: required, fullWidth: true, error: !!error } }}
              />
              <FormHelperText error={!!error}>{error ? error.message : ' '}</FormHelperText>
            </Fragment>
          </LocalizationProvider>
        )
      }}
    />
  )
}
export default DatePicker
