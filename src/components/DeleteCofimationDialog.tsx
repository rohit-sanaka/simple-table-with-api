import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { dialogAndAlertContext } from '../contexts/DialogAndAlertProvider'
import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserService from '../services/UserService'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const DeleteCofimationDialog = () => {
  const { dialogAndAlertState, dispatch } = useContext(dialogAndAlertContext)

  const queryClient = useQueryClient()

  const { mutate: deleteAccount, isLoading } = useMutation({
    mutationKey: ['Delete User', dialogAndAlertState?.delete?.rowData?.id],
    mutationFn: async (id: string) => await UserService.deleteUser(id),
    onSuccess: () => {
      dispatch({ type: 'CLOSE_DELETE_DIALOG' })
      dispatch({ type: 'OPEN_ALERT', payload: { msg: `User deleted successfully`, type: 'success' } })
      queryClient.invalidateQueries(['Users'])
    },
    onError: (error: AxiosError<AxiosResponse>) => {
      dispatch({
        type: 'OPEN_ALERT',
        payload: { msg: 'Error while deleting user : ' + error?.response?.data?.data?.message, type: 'error' },
      })
    },
  })

  return (
    <Dialog open={dialogAndAlertState.delete.openDialog} fullWidth maxWidth='md'>
      <div className='px-2 py-5'>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Action</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{' '}
          <span className='font-bold text-purple-700'>{`${dialogAndAlertState?.delete?.rowData?.firstName} ${dialogAndAlertState?.delete?.rowData?.lastName}`}</span>
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
                if (dialogAndAlertState?.delete?.rowData) {
                  deleteAccount(dialogAndAlertState?.delete?.rowData?.id)
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
