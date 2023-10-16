import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '../types/User'
import UserService from '../services/UserService'
import { AxiosError, AxiosResponse } from 'axios'
import { useContext } from 'react'
import { dialogAndAlertContext } from '../contexts/DialogAndAlertProvider'

const useCreateUser = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useContext(dialogAndAlertContext)

  return useMutation<User, AxiosError<AxiosResponse>, User>({
    mutationKey: ['create User'],
    mutationFn: async (user) => await UserService.createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries(['Users'])
      dispatch({ type: 'CLOSE_CREATE_DIALOG' })
      dispatch({ type: 'OPEN_ALERT', payload: { msg: 'Account created successfully', type: 'success' } })
    },

    onError: () => {
      dispatch({ type: 'OPEN_ALERT', payload: { msg: 'Please input valid data', type: 'error' } })
    },
  })
}
export default useCreateUser
