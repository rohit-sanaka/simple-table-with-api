import { useForm, FormProvider } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, CircularProgress } from '@mui/material'
import { User } from '../types/User'
import TextField from '../RHF_Input_Templets/RHF_TextField'
import { dialogAndAlertContext } from '../contexts/DialogAndAlertProvider'
import { useContext, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserService from '../services/UserService'
import { AxiosError, AxiosResponse } from 'axios'
import { FormControl, FormLabel } from '@mui/material'
import Select from '../RHF_Input_Templets/RHF_SelectField'
import Radio from '../RHF_Input_Templets/RHF_RadioGroup'
import DatePicker from '../RHF_Input_Templets/RHF_DatePicker'
import timezonesArray from '../utils/timezoneObject'

const titleOptinos = [
  { value: '', label: '--None--' },
  { value: 'mr', label: 'Mr' },
  { value: 'mrs', label: 'Mrs' },
  { value: 'miss', label: 'Miss' },
  { value: 'ms', label: 'Ms' },
  { value: 'dr', label: 'Dr' },
]

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

const timezones = timezonesArray

const schema: yup.AnyObjectSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  gender: yup.string().required('Title is required'),
  firstName: yup
    .string()
    .required('Fisrt Name is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(50, 'First Name can be at most 50 characters'),
  lastName: yup
    .string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters')
    .max(50, 'Last Name can be at most 50 characters'),
  email: yup.string().required('Email is required').email('Invalid email'),
  dateOfBirth: yup.date().required('Date of Birth is required'),
  phone: yup.string().required('Phone Number is required'),
  picture: yup.string(),
  location: yup.object().shape({
    street: yup.string(),
    city: yup.string(),
    state: yup.string(),
    country: yup.string(),
    timezone: yup.string(),
  }),
})

const EditAccountForm = () => {
  const { dialogAndAlertState, dispatch } = useContext(dialogAndAlertContext)
  const queryClient = useQueryClient()

  const defaultValues: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: null,
    phone: '',
    picture: '',
    location: {
      street: '',
      city: '',
      state: '',
      country: '',
      timezone: '',
    },
    ...dialogAndAlertState?.edit?.rowData,
  }

  const {
    data,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
    isError: isErrorFetchingUser,
  } = useQuery<User, AxiosError<AxiosResponse> | Error>({
    queryKey: ['User', dialogAndAlertState?.edit?.rowData?.id],
    queryFn: async () => await UserService.getUser(dialogAndAlertState?.edit?.rowData?.id ?? ' '),
    retry: 2,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isErrorFetchingUser) {
      dispatch({
        type: 'OPEN_ALERT',
        payload: { msg: `Error while fetching user `, type: 'error' },
      })
    }
  }, [isErrorFetchingUser, dispatch])

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
    reValidateMode: 'onChange',
    values: data,
  })

  const { mutate: editAccount, isLoading } = useMutation({
    mutationKey: ['Edit User', dialogAndAlertState?.edit?.rowData?.id],
    mutationFn: async (user: User) => await UserService.editUser(dialogAndAlertState?.edit?.rowData?.id ?? ' ', user),
    onSuccess: () => {
      queryClient.invalidateQueries(['Users'])
      dispatch({ type: 'OPEN_ALERT', payload: { msg: `User updated successfully`, type: 'success' } })
      dispatch({ type: 'CLOSE_EDIT_DIALOG' })
    },
    onError: (error: AxiosError<AxiosResponse>) => {
      if (error?.response) {
        const serverErrors = error?.response?.data?.data
        for (const field in serverErrors) {
          methods.setError(field, {
            type: 'manual',
            message: serverErrors[field],
          })
        }
      }
      dispatch({
        type: 'OPEN_ALERT',
        payload: { msg: `Error while updating user : ${error?.response?.data?.data?.message}`, type: 'success' },
      })
    },
  })

  const onSubmit = (data: User) => {
    if (!isLoading) {
      editAccount(data)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate autoComplete='off' className='px-2 py-5'>
        <Grid
          container
          spacing={3}
          sx={{ position: 'relative' }}
          className={`${isLoadingUser || isFetchingUser ? 'bg-gray-200 opacity-80' : ''}`}
        >
          <Grid item xs={4}>
            <Select name='title' label='Title' required={true} options={titleOptinos} />
          </Grid>
          <Grid item xs={4}>
            <TextField name='firstName' label='First Name' required={true} />
          </Grid>
          <Grid item xs={4}>
            <TextField name='lastName' label='Last Name' required={true} />
          </Grid>
          <Grid item xs={5}>
            <TextField name='email' label='Email' required={true} />
          </Grid>
          <Grid item xs={3}>
            <TextField name='phone' label='Phone Number' required={true} />
          </Grid>
          <Grid item xs={4}>
            <DatePicker name='dateOfBirth' label='Date of Birth' required={true} />
          </Grid>
          <Grid item xs={6}>
            <Radio name='gender' label='Gender' required={true} options={genderOptions} direction='row' />
          </Grid>
          <Grid item xs={6}>
            <TextField name='picture' label='Picture' helperText='Please provide picture url' />
          </Grid>
          <Grid item xs={12} spacing={3}>
            <FormControl fullWidth>
              <FormLabel sx={{ mb: 1 }}>Location</FormLabel>
              <Grid container spacing={1} direction='row'>
                <Grid item xs={4}>
                  <TextField name='location.street' label='Street' />
                </Grid>
                <Grid item xs={4}>
                  <TextField name='location.city' label='City' />
                </Grid>
                <Grid item xs={4}>
                  <TextField name='location.state' label='State' />
                </Grid>
                <Grid item xs={4}>
                  <TextField name='location.country' label='country' />
                </Grid>
                <Grid item xs={4}>
                  <Select name='location.timezone' label='Timezone' options={timezones} />
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: 2 }}>
              <Button
                onClick={() => dispatch({ type: 'CLOSE_EDIT_DIALOG' })}
                type='reset'
                color='secondary'
                variant='contained'
              >
                Cancel
              </Button>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button type='submit' variant='contained' disabled={isLoading}>
                  Submit
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </Box>
          </Grid>
          {(isLoadingUser || isFetchingUser) && (
            <CircularProgress
              size={50}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Grid>
      </form>
    </FormProvider>
  )
}

export default EditAccountForm
