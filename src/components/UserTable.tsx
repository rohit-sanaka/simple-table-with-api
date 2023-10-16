import { User } from '../types/User'
import { useState, useMemo, Fragment, useContext, lazy, Suspense } from 'react'
import { MaterialReactTable, MRT_PaginationState, MRT_ColumnDef } from 'material-react-table'
import { IconButton, Tooltip, Box, Snackbar, Alert, ThemeProvider, CircularProgress } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteCofimationDialog from './DeleteCofimationDialog'
import { dialogAndAlertContext } from '../contexts/DialogAndAlertProvider'
import { formLabelsTheme } from '../muiTheme/MuiTheme'
import useGetUsers from '../hooks/useGetUsers'
import FormDialog from './FormDialog'
const EditAccountForm = lazy(() => import('./EditAccountForm'))
const CreateAccountForm = lazy(() => import('./CreateAccountForm'))

const UserTable = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { dialogAndAlertState, dispatch } = useContext(dialogAndAlertContext)
  const { data, isLoading, isFetching, error, isError, refetch: refetchUsers } = useGetUsers({ pagination })

  const handleAlertClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
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
        size: 100,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            <img
              alt='avatar'
              height='20%'
              width='20%'
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
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        header: 'Full Name',
        id: 'fullName',
        accessorFn: (row) => {
          const fullName = `${row.firstName} ${row.lastName}`
          return fullName === 'null null' ? '' : fullName
        },
      },
    ],
    []
  )

  return (
    <div className='relative p-5'>
      <MaterialReactTable
        columns={columns}
        data={data?.data ?? []}
        manualPagination
        enableRowSelection
        enablePinning
        enableRowActions
        enableDensityToggle={false}
        initialState={{
          density: 'compact',
          columnPinning: {
            right: ['mrt-row-actions'],
            left: ['mrt-row-select'],
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            paddingBlock: 0,
            // marginBlock: 0,
            borderBlock: 0,
          },
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
                <EditIcon color='secondary' />
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
        renderTopToolbarCustomActions={({ table }) => (
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
            <IconButton
              disabled={!(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected())}
              onClick={() => {
                const tableData = table.getSelectedRowModel().flatRows.map((row) => {
                  return row.original
                })
                dispatch({ type: 'OPEN_DELETE_DIALOG', payload: tableData })
              }}
              title='Delete Selected'
            >
              <Tooltip arrow title='Delete Selected'>
                <DeleteIcon
                  color={`${table.getIsSomeRowsSelected() || table.getIsAllRowsSelected() ? 'error' : 'disabled'}`}
                />
              </Tooltip>
            </IconButton>
          </div>
        )}
        rowCount={data?.total}
        state={{
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isFetching || isLoading,
        }}
      />
      <ThemeProvider theme={formLabelsTheme}>
        <Suspense
          fallback={
            <CircularProgress
              size={75}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          }
        >
          <FormDialog open={dialogAndAlertState.edit.openDialog} title='Edit User Details'>
            <EditAccountForm />
          </FormDialog>
        </Suspense>
        <Suspense
          fallback={
            <CircularProgress
              size={75}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          }
        >
          <FormDialog open={dialogAndAlertState.create.openDialog} title='Create New Account'>
            <CreateAccountForm />
          </FormDialog>
        </Suspense>
        <DeleteCofimationDialog />
      </ThemeProvider>

      <Snackbar
        open={dialogAndAlertState.alert.openAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          severity={`${dialogAndAlertState.alert.alertType ?? 'success'}`}
          sx={{ width: '100%' }}
          onClose={handleAlertClose}
        >
          {dialogAndAlertState.alert.alertMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default UserTable
