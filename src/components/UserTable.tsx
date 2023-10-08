import { useQuery } from '@tanstack/react-query'
import UserService from '../services/UserService'
import { createContext, useReducer } from 'react'
import { User, UserList } from '../types/User'
import { useState, useMemo, useEffect, Fragment, Reducer } from 'react'
import {
  MaterialReactTable,
  MRT_PaginationState,
  MRT_ColumnDef,
  MRT_FullScreenToggleButton,
  MRT_ToggleDensePaddingButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleGlobalFilterButton,
} from 'material-react-table'
import { IconButton, Tooltip, Box, Snackbar, Alert } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import PrintIcon from '@mui/icons-material/Print'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateNewAccountModal from './CreateNewAccountDialog'
import DeleteCofimationModel from './DeleteCofimationModel'
import { InititalStateType, actionType } from '../types/UserTable'

const initialState = {
  create: {
    openDialog: false,
    openAlert: false,
  },
  edit: {
    openDialog: false,
    openAlert: false,
    rowData: null,
  },
  delete: {
    openDialog: false,
    openAlert: false,
    rowData: null,
  },
}

export const modalAndAlertStateContext = createContext<{
  modalAndAlertState: InititalStateType
  dispatch: React.Dispatch<actionType>
}>({
  modalAndAlertState: initialState,
  dispatch: () => {},
})

const reducerFunc = (state: InititalStateType, action: actionType) => {
  switch (action.type) {
    case 'OPEN_CREATE_DIALOG':
      return { ...state, create: { ...state.create, openDialog: true } }
    case 'CLOSE_CREATE_DIALOG':
      return { ...state, create: { ...state.create, openDialog: false } }
    case 'OPEN_CREATE_ALERT':
      return { ...state, create: { ...state.create, openAlert: true } }
    case 'CLOSE_CREATE_ALERT':
      return { ...state, create: { ...state.create, openAlert: false } }

    case 'OPEN_EDIT_DIALOG':
      return { ...state, edit: { ...state.edit, openDialog: true, rowData: action.payload } }
    case 'CLOSE_EDIT_DIALOG':
      return { ...state, edit: { ...state.edit, openDialog: false, rowData: null } }
    case 'OPEN_EDIT_ALERT':
      return { ...state, edit: { ...state.edit, openAlert: true } }
    case 'CLOSE_EDIT_ALERT':
      return { ...state, edit: { ...state.edit, openAlert: false } }

    case 'OPEN_DELETE_DIALOG':
      return { ...state, delete: { ...state.delete, openDialog: true, rowData: action.payload } }
    case 'CLOSE_DELETE_DIALOG':
      return { ...state, delete: { ...state.delete, openDialog: false, rowData: null } }
    case 'OPEN_DELETE_ALERT':
      return { ...state, delete: { ...state.delete, openAlert: true } }
    case 'CLOSE_DELETE_ALERT':
      return { ...state, delete: { ...state.delete, openAlert: false } }
    default:
      return state
  }
}

const UserTable = () => {
  const [modalAndAlertState, dispatch] = useReducer<Reducer<InititalStateType, actionType>>(reducerFunc, initialState)
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const {
    data,
    isLoading,
    isFetching,
    error,
    isError,
    refetch: refetchUsers,
  } = useQuery<UserList, Error>({
    queryKey: ['Users'],
    queryFn: async () => await UserService.getUsers(pagination.pageIndex, pagination.pageSize),
    keepPreviousData: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  })

  // const { data: dataUser } = useQuery<User, Error>({
  //   queryKey: ['User'],
  //   queryFn: async () => await UserService.getUser('60d0fe4f5311236168a109cc'),
  // })

  // const { mutate: editAccount } = useMutation({
  //   mutationKey: ['Edit User'],
  //   mutationFn: async (user: User) => await UserService.createUser(user),
  // })

  useEffect(() => {
    refetchUsers()
  }, [pagination])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    modalAndAlertState.create.openAlert && dispatch({ type: 'CLOSE_CREATE_ALERT' })
    modalAndAlertState.edit.openAlert && dispatch({ type: 'CLOSE_EDIT_ALERT' })
    modalAndAlertState.delete.openAlert && dispatch({ type: 'CLOSE_DELETE_ALERT' })
  }

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'picture',
        header: 'Picture',
        size: 70,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              alt='avatar'
              height={30}
              width={30}
              src={row.original.picture || 'https://mui.com/static/images/avatar/1.jpg'}
              loading='lazy'
              style={{ borderRadius: '50%' }}
            />
          </Box>
        ),
      },
      {
        accessorKey: 'title',
        header: 'Title',
        size: 50,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        header: 'Full Name',
        id: 'fullName',
        size: 200,
        accessorFn: (row) => {
          const fullName = `${row.firstName} ${row.lastName}`
          return fullName === 'null null' ? '' : fullName
        },
      },
    ],
    []
  )

  return (
    <div className='p-10'>
      <MaterialReactTable
        columns={columns}
        data={data?.data ?? []}
        manualPagination
        enableRowSelection
        enableRowActions
        muiTableProps={{
          sx: {
            border: '1px solid rgba(81, 81, 81, 1)',
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            border: '1px solid rgba(81, 81, 81, 1)',
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            border: '1px solid rgba(81, 81, 81, 1)',
          },
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'left',
            },
          },
        }}
        initialState={{
          density: 'compact',
        }}
        renderRowActions={({ row }) => {
          return (
            <div>
              <IconButton
                onClick={() => {
                  dispatch({ type: 'OPEN_EDIT_DIALOG', payload: row.original })
                }}
                title='Edit'
              >
                <EditIcon color='warning' />
              </IconButton>
              <IconButton
                onClick={() => {
                  dispatch({ type: 'OPEN_DELETE_DIALOG', payload: row.original })
                }}
                title='Delete'
              >
                <DeleteIcon color='error' />
              </IconButton>
            </div>
          )
        }}
        positionToolbarAlertBanner='bottom'
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: 'error',
                children: <Fragment>{`Error while Fetching data!!! : ${error?.message}!!!`}</Fragment>,
              }
            : undefined
        }
        onPaginationChange={setPagination}
        renderTopToolbarCustomActions={() => (
          <div className='flex items-center justify-start'>
            <Tooltip arrow title='Refresh Data'>
              <IconButton onClick={() => refetchUsers()}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title='Create New Account'>
              <IconButton onClick={() => dispatch({ type: 'OPEN_CREATE_DIALOG' })}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
        rowCount={data?.total}
        renderToolbarInternalActions={({ table }) => (
          <Fragment>
            <MRT_ToggleGlobalFilterButton table={table} />
            <MRT_ToggleDensePaddingButton table={table} />
            <MRT_FullScreenToggleButton table={table} />
            <MRT_ShowHideColumnsButton table={table} />
            <MRT_ToggleFiltersButton table={table} />
            <IconButton
              onClick={() => {
                window.print()
              }}
            >
              <PrintIcon />
            </IconButton>
          </Fragment>
        )}
        state={{
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isFetching || isLoading,
        }}
      />
      <modalAndAlertStateContext.Provider value={{ modalAndAlertState: modalAndAlertState, dispatch: dispatch }}>
        <CreateNewAccountModal />
        <DeleteCofimationModel />
      </modalAndAlertStateContext.Provider>

      <Snackbar
        open={
          modalAndAlertState.create.openAlert ||
          modalAndAlertState.delete.openAlert ||
          modalAndAlertState.edit.openAlert
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <div>
          {modalAndAlertState.create.openAlert && (
            <Alert severity='success' sx={{ width: '100%' }} onClose={handleClose}>
              Account Create Successfully
            </Alert>
          )}
          {modalAndAlertState.edit.openAlert && (
            <Alert severity='success' sx={{ width: '100%' }} onClose={handleClose}>
              Account Updated Successfully
            </Alert>
          )}
          {modalAndAlertState.delete.openAlert && (
            <Alert severity='success' sx={{ width: '100%' }} onClose={handleClose}>
              Account Deleted Successfully
            </Alert>
          )}
        </div>
      </Snackbar>
    </div>
  )
}

export default UserTable
