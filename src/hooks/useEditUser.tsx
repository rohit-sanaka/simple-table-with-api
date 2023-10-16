import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '../types/User'
import UserService from '../services/UserService'
import { AxiosError, AxiosResponse } from 'axios'
import { useContext } from 'react'
import { dialogAndAlertContext } from '../contexts/DialogAndAlertProvider'

const useEditUser = (id: string) => {
  const queryClient = useQueryClient()
  const { dispatch } = useContext(dialogAndAlertContext)

  return useMutation<User, AxiosError<AxiosResponse>, User>({
    mutationKey: ['Edit User', id],
    mutationFn: async (user) => await UserService.editUser(id ?? ' ', user),

    onSuccess: () => {
      queryClient.invalidateQueries(['Users'])
      dispatch({ type: 'OPEN_ALERT', payload: { msg: `User updated successfully`, type: 'success' } })
      dispatch({ type: 'CLOSE_EDIT_DIALOG' })
    },
    onError: (error: AxiosError<AxiosResponse>) => {
      dispatch({
        type: 'OPEN_ALERT',
        payload: { msg: `Error while updating user : ${error?.response?.data?.data?.message}`, type: 'success' },
      })
    },
  })
}
export default useEditUser
