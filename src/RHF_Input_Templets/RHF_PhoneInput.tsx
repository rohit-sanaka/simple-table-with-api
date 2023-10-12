import { Controller, useFormContext } from 'react-hook-form'
import ReactPhoneInput from 'react-phone-input-2'
import { TextField as MuiTextField, FormHelperText, FormControl, Input } from '@mui/material'
// import { SyntheticEvent } from 'react'
import 'react-phone-input-2/lib/material.css'
import { countryCodes } from '../utils/countryCodes'
import TextField from './RHF_TextField'

// import { AnyObject } from 'yup'
// import { useContext } from 'react'
// import { ValidationContext } from '../components/NewAccountForm'

type TextFieldProps = {
  name: string
  label: string
  required?: boolean
  type?: 'text' | 'number'
  helperText?: string
}

const PhoneInput = ({ name, label, required, type, helperText = ' ' }: TextFieldProps) => {
  const { control, getValues } = useFormContext()
  const values = getValues()
  const country = countryCodes[values?.location?.country] ? countryCodes[values?.location?.country].toLowerCase() : 'us'

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        console.log(value, 'phone')
        return (
          <>
            <ReactPhoneInput
              country={country}
              // value={value}
              // onChange={}
              // countryCodeEditable={false}
              alwaysDefaultMask
              containerClass='MuiInputBase-root MuiStandardInput-root'
              inputProps={{
                type: type,
                name: name,
                value: value,
                onChange: onChange,
                required: required,
                Element: TextField,
                autoComplete: 'off',
                error: !!error,
                label: label,
              }}
            />
            <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
          </>
        )
      }}
    />
  )
}
export default PhoneInput
