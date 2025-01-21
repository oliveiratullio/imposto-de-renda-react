import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/AuthPages/SignUpPage/SignUpPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import SignInPage from './pages/AuthPages/SignInPage/SignInPage'
import CreateDeclarationPage from './pages/DeclarationPages/NewDeclarationPage/NewDeclarationPage'
import AllDeclarationsPage from './pages/DeclarationPages/AllDeclarationsPage/AllDeclarationPage'
import EditDeclarationPage from './pages/DeclarationPages/EditDeclarationPage/EditDeclarationPage'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/declarations/new' element={<CreateDeclarationPage />} />
          <Route path='/declarations' element={<AllDeclarationsPage />} />
          <Route path="/declarations/edit/:id" element={<EditDeclarationPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
