import AuthLayout from './_auth/AuthLayout';
import RegisterForm from './_auth/form/RegisterForm';
import './index.css';
import { Routes, Route } from 'react-router-dom';

type Props = {}

const App = (props: Props) => {
  return (
    <main className='flex h-screen'>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/register' element={<RegisterForm />} />
        </Route>

      </Routes>
    </main>
  )
}

export default App