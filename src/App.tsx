import AuthLayout from './_auth/AuthLayout';
import LoginFrom from './_auth/form/LoginFrom';
import RegisterForm from './_auth/form/RegisterForm';
import RootLayout from './_root/RootLayout';
import { Chart, Explore, Genre, Home, LikedList, RecentPlayed, Playlist, Profile, CreateSong } from './_root/pages';
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
          <Route index path='/' element={<Home />} />
          <Route index path='/explore' element={<Explore />} />
          <Route index path='/chart' element={<Chart />} />
          <Route index path='/genre' element={<Genre />} />
          <Route index path='/list-liked' element={<LikedList />} />
          <Route index path='/playlist' element={<Playlist />} />
          <Route index path='/profile/:id/*' element={<Profile />} />
          <Route index path='/list-recently-played' element={<RecentPlayed />} />
          <Route index path='/create-post' element={<CreateSong />} />
        </Route>

      </Routes>

      <Toaster />
    </main>
  )
}

export default App