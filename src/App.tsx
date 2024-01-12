import AuthLayout from './_auth/AuthLayout';
import LoginFrom from './_auth/form/LoginFrom';
import RegisterForm from './_auth/form/RegisterForm';
import RootLayout from './_root/RootLayout';
import { Chart, Explore, Search, Home, LikedList, RecentPlayed, Playlist, Profile, CreateSong, SongDetail } from './_root/pages';
import EditSong from './_root/pages/EditSong';
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
          <Route path='/song/detail/:id' element={<SongDetail />} /> 
          <Route path='/explore' element={<Explore />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/search' element={<Search />} />
          <Route path='/list-liked' element={<LikedList />} />
          <Route path='/playlist' element={<Playlist />} />
          <Route path='/profile/:id/*' element={<Profile />} />
          <Route path='/list-recently-played' element={<RecentPlayed />} />
          <Route path='/create-post' element={<CreateSong />} />
          <Route path='/edit-song/:id' element={<EditSong />} />
        </Route>

      </Routes>

      <Toaster />
    </main>
  )
}

export default App