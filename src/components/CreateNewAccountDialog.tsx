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
    <Dialog open={dialogAndAlertState.create.openDialog} onClose={handleClose} sx={{ m: 2 }} fullWidth maxWidth='md'>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
        Please enter user detiails
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <CreateAccountForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewAccountDialog
