import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { User } from '../types/User'
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type DeleteCofimationModelProps = {
  open : boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: User
  deleteAccount : UseMutateFunction<AxiosResponse, unknown, string, unknown>
}

const DeleteCofimationModel = ({ open,setOpen, user,deleteAccount }: DeleteCofimationModelProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>{`Are you sure you want to delete ${user.firstName} ${user.lastName}`}</DialogContent>
      <DialogActions>
        <Button onClick={() => {setOpen(false)}}>Cancel</Button>
        <Button onClick={() => {deleteAccount(user.id)}}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}
export default DeleteCofimationModel
