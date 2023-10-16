import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { AnyObject } from 'yup'

const FormDialog = ({ children, open, title }: { children: React.ReactNode; open: boolean; title: string }) => {
  //Code to disable the backdrop click and stay on the dialog
  const handleClose = (_event?: AnyObject, reason?: string) => {
    if (reason && reason == 'backdropClick') return
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'sans-serif', pt: 5 }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ px: 5, py: 2 }}>{children}</DialogContent>
    </Dialog>
  )
}

export default FormDialog
