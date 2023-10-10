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
        console.log(value, 'data picker field')
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Fragment>
              <MuiDatePicker
                label={label}
                value={parseISO(value)}
                onChange={onChange}
                onAccept={onChange}
                disableFuture
                format='dd/MM/yyyy'
                slotProps={{ textField: { required: required, fullWidth: true, error: !!error } }}
              />
              <FormHelperText sx={{ pl: 2 }} error={!!error}>
                {error ? error.message : ' '}
              </FormHelperText>
            </Fragment>
          </LocalizationProvider>
        )
      }}
    />
  )
}
export default DatePicker
