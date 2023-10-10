import axios from 'axios'
import { User, UserList } from '../types/User'
const apiClient = axios.create({
  baseURL: 'https://dummyapi.io/data/v1/',
  headers: {
    'Content-type': 'application/json',
    'app-id': import.meta.env.VITE_API_APP_ID,
  },
})

const getAllUsers = async () => {
  const responce = await apiClient.get<UserList[]>('/user')
  return responce
}
const getUser = async (id: string) => {
  const responce = await apiClient.get<User>(`/user/${id}`)
  console.log(responce.data)
  return responce.data
}

const getUsers = async (page: number, limit: number) => {
  const responce = await apiClient.get<UserList>(`/user/?page=${page}&limit=${limit}`)
  return responce.data
}

const createUser = async (user: User) => {
  const responce = await apiClient.post<User>('/user/create', user)
  return responce.data
}

const editUser = async (id: string, data: User) => {
  console.log(data, 'data submitted to api')
  const responce = await apiClient.put<User>(`/user/${id}`, data)
  return responce.data
}

const deleteUser = async (id: string) => {
  const responce = await apiClient.delete<User>(`/user/${id}`)
  console.log(responce)
  return responce
}

const UserService = {
  getAllUsers,
  getUsers,
  createUser,
  editUser,
  deleteUser,
  getUser,
}

export default UserService
