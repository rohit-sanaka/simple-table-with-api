import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { AxiosError } from 'axios'
import { modalAndAlertStateContext } from './UserTable'
import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserService from '../services/UserService'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

// type DeleteCofimationModelProps = {
//   open: boolean
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>
//   user: User
//   deleteAccount: UseMutateFunction<AxiosResponse, unknown, string, unknown>
// }

const DeleteCofimationModel = () => {
  const { modalAndAlertState, dispatch } = useContext(modalAndAlertStateContext)

  const queryClient = useQueryClient()

  const { mutate: deleteAccount, isLoading } = useMutation({
    mutationKey: ['Delete User'],
    mutationFn: async (id: string) => await UserService.deleteUser(id),
    onSuccess: () => {
      dispatch({ type: 'CLOSE_DELETE_DIALOG' })
      // dispatch({ type: 'OPEN_DELETE_ALERT' })
      queryClient.invalidateQueries(['Users'])
    },
    onError: (error: AxiosError) => {
      alert(error?.message)
    },
  })

  return (
    <Dialog open={modalAndAlertState.delete.openDialog} fullWidth maxWidth='xs'>
      <div className='px-2 py-5'>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Action</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{' '}
          <span className='font-bold text-purple-700'>{`${modalAndAlertState?.delete?.rowData?.firstName} ${modalAndAlertState?.delete?.rowData?.lastName}`}</span>
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
              onClick={() => {
                if (modalAndAlertState?.delete?.rowData) {
                  deleteAccount(modalAndAlertState?.delete?.rowData?.id)
                }
              }}
            >
              Delete
            </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: 'white',
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
export default DeleteCofimationModel
