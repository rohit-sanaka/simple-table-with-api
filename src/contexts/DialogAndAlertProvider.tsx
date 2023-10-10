import React, { useReducer, useMemo, Reducer } from 'react'
import { InititalStateType, actionType } from '../types/UserTable'
import { Dispatch, createContext } from 'react'

type dialogAndAlertContextType = {
  dialogAndAlertState: InititalStateType
  dispatch: Dispatch<actionType>
}

const initialState = {
  create: {
    openDialog: false,
  },
  edit: {
    openDialog: false,
    rowData: null,
  },
  delete: {
    openDialog: false,
    rowData: null,
  },
  alert: {
    openAlert: false,
    alertType: null,
    alertMsg: '',
  },
}

// eslint-disable-next-line react-refresh/only-export-components
export const dialogAndAlertContext = createContext<dialogAndAlertContextType>({
  dialogAndAlertState: initialState,
  dispatch: () => {},
})

const reducerFunc = (state: InititalStateType, action: actionType) => {
  switch (action.type) {
    case 'OPEN_CREATE_DIALOG':
      return { ...state, create: { ...state.create, openDialog: true } }
    case 'CLOSE_CREATE_DIALOG':
      return { ...state, create: { ...state.create, openDialog: false } }

    case 'OPEN_EDIT_DIALOG':
      return { ...state, edit: { ...state.edit, openDialog: true, rowData: action.payload } }
    case 'CLOSE_EDIT_DIALOG':
      return { ...state, edit: { ...state.edit, openDialog: false, rowData: null } }

    case 'OPEN_DELETE_DIALOG':
      return { ...state, delete: { ...state.delete, openDialog: true, rowData: action.payload } }
    case 'CLOSE_DELETE_DIALOG':
      return { ...state, delete: { ...state.delete, openDialog: false, rowData: null } }

    case 'OPEN_ALERT':
      return {
        ...state,
        alert: { ...state.alert, openAlert: true, alertMsg: action.payload.msg, alertType: action.payload.type },
      }
    case 'CLOSE_ALERT':
      return { ...state, alert: { ...state.alert, openAlert: false } }
    default:
      return state
  }
}

const DialogAndAlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialogAndAlertState, dispatch] = useReducer<Reducer<InititalStateType, actionType>>(reducerFunc, initialState)

  const contextValue = useMemo(() => ({ dialogAndAlertState, dispatch }), [dialogAndAlertState])

  return <dialogAndAlertContext.Provider value={contextValue}>{children}</dialogAndAlertContext.Provider>
}
export default DialogAndAlertProvider
