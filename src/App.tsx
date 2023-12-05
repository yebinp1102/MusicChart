import AuthLayout from './_auth/AuthLayout';
import LoginFrom from './_auth/form/LoginFrom';
import RegisterForm from './_auth/form/RegisterForm';
import RootLayout from './_root/RootLayout';
import Home from './_root/pages/Home';
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

        <Route element={<RootLayout />}>
          <Route path='/' element={<Home />} />
        </Route>

      </Routes>

      <Toaster />
    </main>
  )
}

export default App