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
    <Dialog open={dialogAndAlertState.edit.openDialog} onClose={handleClose} sx={{ m: 2 }} fullWidth maxWidth='md'>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'sans-serif' }}>User Details</DialogTitle>
      <DialogContent sx={{ p: 1 }}>
        <EditAccountForm />
      </DialogContent>
    </Dialog>
  )
}

export default EditAccountDialog
