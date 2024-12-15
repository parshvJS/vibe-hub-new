import { Routes, Route } from 'react-router-dom'
import SignupForm from './_auth/forms/SignupForm'
import LoginForm from './_auth/forms/LoginForm'
import Home  from './_root/Pages'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from "@/components/ui/toaster"
import { AllUsers, Explore, Profile } from './components/shared'
import Saved from './components/shared/Saved'
import CreatePost from './components/shared/CreatePost'
import EditPost from './components/shared/EditPost'
import PostDetails from './components/shared/PostDetails'
import UpdateProfile from './components/shared/UpdateProfile'


function App() {

  return (
    <main className='flex h-screen'>
      <Routes>

        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/signin' element={<SignupForm />} />
          <Route path='/login' element={<LoginForm />} />
        </Route>


        {/* private routes  */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        {/*   */}
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/all-users' element={<AllUsers/>} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:id' element={<EditPost/>} />
          <Route path='/post/:id' element={<PostDetails />} />
          <Route path='/profile/:id/*' element={<Profile />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster/>
    </main>



  )
}

export default App
