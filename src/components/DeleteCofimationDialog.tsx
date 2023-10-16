import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { dialogAndAlertContext } from '../contexts/DialogAndAlertProvider'
import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserService from '../services/UserService'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { AnyObject } from 'yup'

const DeleteCofimationDialog = () => {
  const { dialogAndAlertState, dispatch } = useContext(dialogAndAlertContext)

  const usersToDelete = dialogAndAlertState?.delete?.rowData
  const queryClient = useQueryClient()

  const { mutate: deleteAccount, isLoading } = useMutation<AnyObject, AxiosError<AxiosResponse>, string>({
    mutationFn: async (id: string) => await UserService.deleteUser(id),
    onError: (error: AxiosError<AxiosResponse>) => {
      dispatch({
        type: 'OPEN_ALERT',
        payload: {
          msg: 'Error while deleting user : ' + error?.response?.data?.data?.message,
          type: 'error',
        },
      })
    },
  })

  return (
    <Dialog open={dialogAndAlertState.delete.openDialog} fullWidth maxWidth='md'>
      <div className='px-2 py-5'>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Action</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{' '}
          <span className='font-bold text-purple-700'>
            {Array.isArray(usersToDelete)
              ? usersToDelete.map((user) => user.firstName + ' ' + user.lastName).join(', ')
              : `${usersToDelete?.firstName} ${usersToDelete?.lastName}`}
          </span>
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
              dispatch({ type: 'CLOSE_DELETE_DIALOG' })
            }}
          >
            Cancel
          </Button>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button
              variant='contained'
              color='error'
              disabled={isLoading}
              onClick={() => {
                if (usersToDelete) {
                  Array.isArray(usersToDelete)
                    ? usersToDelete.forEach((user) =>
                        deleteAccount(user.id, {
                          onSuccess: () => {
                            dispatch({
                              type: 'OPEN_ALERT',
                              payload: {
                                msg: `All selected users deleted successfully`,
                                type: 'success',
                              },
                            })

                            dispatch({ type: 'CLOSE_DELETE_DIALOG' })
                            queryClient.invalidateQueries(['Users'])
                          },
                        })
                      )
                    : deleteAccount(usersToDelete.id, {
                        onSuccess: () => {
                          dispatch({
                            type: 'OPEN_ALERT',
                            payload: {
                              msg: `Deleted User successfully`,
                              type: 'success',
                            },
                          })

                          dispatch({ type: 'CLOSE_DELETE_DIALOG' })
                          queryClient.invalidateQueries(['Users'])
                        },
                      })
                }
              }}
            >
              Delete
            </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: 'red',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </DialogActions>
      </div>
    </Dialog>
  )
}
export default DeleteCofimationDialog
