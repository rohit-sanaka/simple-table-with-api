import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import NewAccountForm from './NewAccountForm'
import { AnyObject } from 'yup'
import { createAccountDialogContext } from './UserTable'
import { useContext } from 'react'

const CreateNewAccountModal = () => {
  const { open, setOpen } = useContext(createAccountDialogContext)

  //Code to disable the backdrop click and stay on the dialog
  const handleClose = (_event?: AnyObject, reason?: string) => {
    if (reason && reason == 'backdropClick') return
    else setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ p: 5, pb: 0 }}>User Details</DialogTitle>
      <DialogContent>
        <NewAccountForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewAccountModal
