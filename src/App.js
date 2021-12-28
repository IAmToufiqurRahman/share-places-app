import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NewPlace from './places/pages/NewPlace'
import Users from './user/pages/Users'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import UserPlaces from './places/pages/UserPlaces'

const App = () => {
  return (
    <Router>
      <MainNavigation />

      <main>
        <Routes>
          <Route path='/' element={<Users />} />

          <Route path='/places/new' element={<NewPlace />} />

          <Route path='/:userId/places' element={<UserPlaces />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
