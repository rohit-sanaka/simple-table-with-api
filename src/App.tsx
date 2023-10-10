import UserTable from './components/UserTable'
import DialogAndAlertProvider from './contexts/DialogAndAlertProvider'

const App = () => {
  return (
    <DialogAndAlertProvider>
      <UserTable />
    </DialogAndAlertProvider>
  )
}

export default App
