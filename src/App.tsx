import AuthLayout from './_auth/AuthLayout';
import LoginFrom from './_auth/form/LoginFrom';
import RegisterForm from './_auth/form/RegisterForm';
import { Toaster } from './components/ui/toaster';
import './index.css';
import { Routes, Route } from 'react-router-dom';



const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginFrom />} />
        </Route>

      </Routes>

      <Toaster />
    </main>
  )
}

export default App