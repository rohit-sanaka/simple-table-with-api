import { useQuery } from '@tanstack/react-query'
import UserService from '../services/UserService'
import { User, UserList } from '../types/User'
import { useState, useMemo, useEffect, Fragment, useContext } from 'react'
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
// import { InititalStateType, actionType } from '../types/UserTable'
import CreateNewAccountDialog from './CreateNewAccountDialog'
import EditAccountDialog from './EditAccountDialog'
import DeleteCofimationDialog from './DeleteCofimationDialog'
import { dialogAndAlertContext } from '../contexts/DialogAndAlertProvider'

const UserTable = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { dialogAndAlertState, dispatch } = useContext(dialogAndAlertContext)

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
  })

  useEffect(() => {
    refetchUsers()
  }, [pagination])

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dialogAndAlertState.alert.openAlert && dispatch({ type: 'CLOSE_ALERT' })
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
              src={row.original.picture || 'https://mui.com/static/images/avatar/6.jpg'}
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
      <CreateNewAccountDialog />
      <DeleteCofimationDialog />
      <EditAccountDialog />

      <Snackbar
        open={dialogAndAlertState.alert.openAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity={`${dialogAndAlertState.alert.alertType ?? 'success'}`}
          sx={{ width: '100%' }}
          onClose={handleClose}
        >
          {dialogAndAlertState.alert.alertMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default UserTable
