import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import CreateAccountForm from './CreateAccountForm'
import { AnyObject } from 'yup'
import { dialogAndAlertContext } from '../contexts/DialogAndAlertProvider'
import { useContext } from 'react'

const CreateNewAccountDialog = () => {
  const { dialogAndAlertState, dispatch } = useContext(dialogAndAlertContext)

  //Code to disable the backdrop click and stay on the dialog
  const handleClose = (_event?: AnyObject, reason?: string) => {
    if (reason && reason == 'backdropClick') return
    else dispatch({ type: 'CLOSE_CREATE_DIALOG' })
  }

  return (
    <Dialog open={dialogAndAlertState.create.openDialog} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'sans-serif', pt:5 }}>
        Please enter user detiails
      </DialogTitle>
      <DialogContent sx={{ px: 5, py: 2 }}>
        <CreateAccountForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewAccountDialog
