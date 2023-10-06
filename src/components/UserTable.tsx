import { useMutation, useQuery } from '@tanstack/react-query'
import UserService from '../services/UserService'
import { createContext } from 'react'
import { User, UserList } from '../types/User'
import { useState, useMemo, useEffect, Fragment } from 'react'
import {
  MaterialReactTable,
  MRT_PaginationState,
  MRT_ColumnDef,
  MRT_FullScreenToggleButton,
  MRT_ToggleDensePaddingButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleGlobalFilterButton,
  MRT_Row,
} from 'material-react-table'
import { IconButton, Tooltip, Box } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import PrintIcon from '@mui/icons-material/Print'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateNewAccountModal from './CreateNewAccountDialog'
import DeleteCofimationModel from './DeleteCofimationModel'
import { AxiosError, AxiosResponse } from 'axios'

export const createAccountDialogContext = createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
  open: false,
  setOpen: () => {},
})

const UserTable = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editRowData, setEditRowData] = useState<User>({} as User)
  const [deleteRowData, setDeleteRowData] = useState<User>({} as User)
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
    enabled: false,
    keepPreviousData: true,
    retry: 2,
  })

  const { mutate: editAccount } = useMutation({
    mutationKey: ['Edit User'],
    mutationFn: async (user: User) => await UserService.createUser(user),
  })

  const { mutate: deleteAccount } = useMutation({
    mutationKey: ['Delete User'],
    mutationFn: async (id: string) => await UserService.deleteUser(id),
    onSuccess: () => {
      setDeleteModalOpen(false)
      alert('Account Deleted successfully')
      refetchUsers()
    },
    onError: (error: AxiosError) => {
      alert(error?.message)
    },
  })

  useEffect(() => {
    refetchUsers()
  }, [pagination])

  // const handleDeleteRow = (row: MRT_Row<User>) => {
  //   if (!confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)) {
  //     return
  //   }
  //   deleteAccount(row.original.id)
  // }

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
        renderRowActions={({ row, table }) => {
          return (
            <div>
              {/* <IconButton onClick={() => table.setEditingRow(row)} title='Edit'> */}
              <IconButton
                onClick={() => {
                  setEditRowData({ ...row.original })
                  setEditModalOpen(true)
                }}
                title='Edit'
              >
                <EditIcon color='warning' />
              </IconButton>
              <IconButton
                onClick={() => {
                  setDeleteRowData({ ...row.original })
                  setDeleteModalOpen(true)
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
              <IconButton onClick={() => setCreateModalOpen(true)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
        rowCount={data?.total}
        renderToolbarInternalActions={({ table }) => (
          <>
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
          </>
        )}
        state={{
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isFetching,
        }}
      />
      <createAccountDialogContext.Provider value={{ open: createModalOpen, setOpen: setCreateModalOpen }}>
        <CreateNewAccountModal />
      </createAccountDialogContext.Provider>
      
      <DeleteCofimationModel
        user={deleteRowData}
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        deleteAccount={deleteAccount}
      />
    </div>
  )
}

export default UserTable
