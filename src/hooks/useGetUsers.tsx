import { useQuery } from '@tanstack/react-query'
import { UserList } from '../types/User'
import UserService from '../services/UserService'

type useGetUsersProps = {
  pagination: {
    pageIndex: number
    pageSize: number
  }
}
const useGetUsers = ({ pagination }: useGetUsersProps) => {
  const queryKey = ['Users', pagination]

  return useQuery<UserList, Error>({
    queryKey: queryKey,
    queryFn: async () => await UserService.getUsers(pagination.pageIndex, pagination.pageSize),
    keepPreviousData: true,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
export default useGetUsers
