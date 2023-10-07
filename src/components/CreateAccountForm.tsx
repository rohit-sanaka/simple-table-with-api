import { useForm, FormProvider } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, CircularProgress } from '@mui/material'
import { User } from '../types/User'
import TextField from '../RHF_Input_Templets/RHF_TextField'
import { modalAndAlertStateContext } from './UserTable'
import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserService from '../services/UserService'
import { AxiosError, AxiosResponse } from 'axios'
import Select from '../RHF_Input_Templets/RHF_SelectField'

const titleOptinos = [
  { value: '', label: '--None--' },
  { value: 'mr', label: 'Mr' },
  { value: 'mrs', label: 'Mrs' },
  { value: 'miss', label: 'Miss' },
  { value: 'ms', label: 'Ms' },
  { value: 'dr', label: 'Dr' },
]

const schema: yup.AnyObjectSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
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
})

const CreateAccountForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useContext(modalAndAlertStateContext)

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  })

  const { mutate: createAccount, isLoading } = useMutation({
    mutationKey: ['create User'],
    mutationFn: async (user: User) => await UserService.createUser(user),

    onSuccess: () => {
      queryClient.invalidateQueries(['Users'])
      // setOpen(false)
      dispatch({ type: 'CLOSE_CREATE_DIALOG' })
      // dispatch({ type: 'OPEN_CREATE_ALERT' })
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
    },
  })

  const onSubmit = (data: User) => {
    if (!isLoading) {
      createAccount(data)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Select name='title' label='Title' required={true} options={titleOptinos} />
          </Grid>
          <Grid item xs={5}>
            <TextField name='firstName' label='First Name' required={true} />
          </Grid>
          <Grid item xs={5}>
            <TextField name='lastName' label='Last Name' required={true} />
          </Grid>
          <Grid item xs={12}>
            <TextField name='email' label='Email' required={true} />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: 2 }}>
              <Button
                onClick={() => dispatch({ type: 'CLOSE_CREATE_DIALOG' })}
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
        </Grid>
      </form>
    </FormProvider>
  )
}

export default CreateAccountForm
