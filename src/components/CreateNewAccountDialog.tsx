import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import CreateAccountForm from './CreateAccountForm'
import { AnyObject } from 'yup'
import { modalAndAlertStateContext } from './UserTable'
import { useContext } from 'react'

const CreateNewAccountModal = () => {
  const { modalAndAlertState, dispatch } = useContext(modalAndAlertStateContext)

  //Code to disable the backdrop click and stay on the dialog
  const handleClose = (_event?: AnyObject, reason?: string) => {
    if (reason && reason == 'backdropClick') return
    else dispatch({ type: 'CLOSE_CREATE_DIALOG' })
  }

  return (
    <Dialog open={modalAndAlertState.create.openDialog} onClose={handleClose} sx={{ m: 2 }} fullWidth maxWidth='md'>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <CreateAccountForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewAccountModal
