export type User = {
  id: string
  title?: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr'
  firstName: string
  lastName: string
  gender?: 'male' | 'female' | 'other'
  email: string
  picture?: string
  dateOfBirth?: Date
  phone?: string
  location?: Location
  registerDate?: Date
  updatedDate?: Date
}

export type UserList = {
  data: User[]
  total: number
  page: number
  limit: number
}

export type Location = {
  street?: string
  city?: string
  state?: string
  country?: string
  timezone?: string
}
