import { User } from './User'

export type InititalStateType = {
  create: {
    openDialog: boolean
    openAlert: boolean
  }
  edit: {
    openDialog: boolean
    openAlert: boolean
    rowData: null | User
  }
  delete: {
    openDialog: boolean
    openAlert: boolean
    rowData: null | User
  }
}

export type actionType =
  | { type: 'OPEN_CREATE_DIALOG' }
  | { type: 'CLOSE_CREATE_DIALOG' }
  | { type: 'OPEN_CREATE_ALERT' }
  | { type: 'CLOSE_CREATE_ALERT' }
  | { type: 'OPEN_EDIT_DIALOG'; payload: User }
  | { type: 'CLOSE_EDIT_DIALOG' }
  | { type: 'OPEN_EDIT_ALERT' }
  | { type: 'CLOSE_EDIT_ALERT' }
  | { type: 'OPEN_DELETE_DIALOG'; payload: User }
  | { type: 'CLOSE_DELETE_DIALOG' }
  | { type: 'OPEN_DELETE_ALERT' }
  | { type: 'CLOSE_DELETE_ALERT' }
