// export type User = {
//   id: string
//   title: 'ms' | 'mrs' | 'miss' | 'mr'
//   firstName: string
//   lastName: string
//   picture: string
// }

export type User = {
  id: string
  title?: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr'
  firstName: string
  lastName: string
  gender?: 'male' | 'female' | 'other'
  email: string
  dateOfBirth?: string
  registerDate: string
  phone?: string
  picture?: string
  location?: object
}

export type UserList = {
  data: User[]
  total: number
  page: number
  limit: number
}
