import { useQuery } from '@tanstack/react-query'
import { User } from '../types/User'
import UserService from '../services/UserService'
import { AxiosError, AxiosResponse } from 'axios'

const useGetUser = (id: string) => {
  const queryKey = ['Users', id]

  return useQuery<User, AxiosError<AxiosResponse> | Error>({
    queryKey: queryKey,
    queryFn: async () => await UserService.getUser(id ?? ' '),
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
export default useGetUser
