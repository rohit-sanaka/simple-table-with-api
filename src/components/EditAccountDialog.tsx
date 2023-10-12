import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { AnyObject } from 'yup'
import { dialogAndAlertContext } from '../contexts/DialogAndAlertProvider'
import { useContext } from 'react'
import EditAccountForm from './EditAccountForm'

const EditAccountDialog = () => {
  const { dialogAndAlertState, dispatch } = useContext(dialogAndAlertContext)

  //Code to disable the backdrop click and stay on the dialog
  const handleClose = (_event?: AnyObject, reason?: string) => {
    if (reason && reason == 'backdropClick') return
    else dispatch({ type: 'CLOSE_EDIT_DIALOG' })
  }

  return (
    <Dialog open={dialogAndAlertState.edit.openDialog} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'sans-serif', pt: 5 }}>
        User Details
      </DialogTitle>
      <DialogContent sx={{ px: 5, py: 2 }}>
        <EditAccountForm />
      </DialogContent>
    </Dialog>
  )
}

export default EditAccountDialog
