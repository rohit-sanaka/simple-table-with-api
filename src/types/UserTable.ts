import { User } from './User'

export type InititalStateType = {
  create: {
    openDialog: boolean
  }
  edit: {
    openDialog: boolean
    rowData: null | User
  }
  delete: {
    openDialog: boolean
    rowData: null | User | User[]
  }
  alert: {
    openAlert: boolean
    alertType: null | alertType
    alertMsg: string
  }
}

export type alertType = 'error' | 'success' | 'info' | 'warning'

export type actionType =
  | { type: 'OPEN_CREATE_DIALOG' }
  | { type: 'CLOSE_CREATE_DIALOG' }
  | { type: 'OPEN_EDIT_DIALOG'; payload: User }
  | { type: 'CLOSE_EDIT_DIALOG' }
  | { type: 'OPEN_DELETE_DIALOG'; payload: User | User[] }
  | { type: 'CLOSE_DELETE_DIALOG' }
  | { type: 'OPEN_ALERT'; payload: { type: alertType; msg: string } }
  | { type: 'CLOSE_ALERT' }
