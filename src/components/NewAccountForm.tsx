import { useForm, FormProvider } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, Box, Button } from '@mui/material'
import { User } from '../types/User'
import TextField from '../RHF_Input_Templets/RHF_TextField'
import { createAccountDialogContext } from './UserTable'
import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserService from '../services/UserService'
import { AxiosError, AxiosResponse } from 'axios'

const schema: yup.AnyObjectSchema = yup.object().shape({
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

const NewAccountForm = () => {
  const queryClient = useQueryClient()
  const { setOpen } = useContext(createAccountDialogContext)

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  })

  const {
    mutate: createAccount,
    isLoading,
  } = useMutation({
    mutationKey: ['create User'],
    mutationFn: async (user: User) => await UserService.createUser(user),

    onSuccess: () => {
      alert('Account Created')
      queryClient.invalidateQueries(['Users'])
      setOpen(false)
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
        <Box sx={{ p: 2 }}>
          <Stack direction='column' spacing={2}>
            <TextField name='firstName' label='First Name' required={true} />
            <TextField name='lastName' label='Last Name' required={true} />
            <TextField name='email' label='Email' required={true} />
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: 2 }}>
          <Button onClick={() => setOpen(false)} type='reset' color='secondary' variant='contained'>
            Cancel
          </Button>
          <Button type='submit' color='primary' variant='contained'>
            {isLoading ? `Submitting...` : `Submit`}
          </Button>
        </Box>
      </form>
    </FormProvider>
  )
}

export default NewAccountForm
