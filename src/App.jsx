import './App.css'
import { NavLink, Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <header>
          <div>
            <img className='image_1' src="/clouds.svg" alt="sun" /><h2>Weather</h2>
          </div>
          <nav>
            <NavLink className='Navlink' to='/pages/Home'>
              Home
            </NavLink>
            <NavLink className='Navlink' to='/pages/Cities'>
              Cities
            </NavLink>
            <NavLink className='Navlink' to='/pages/PrevisionHere'>
              PrevisionHere
            </NavLink>
            <NavLink className='Navlink' to='/pages/PrevisionCities'>
              PrevisionCities
            </NavLink>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          Created by: Jorge Perez Requena
        </footer>

      </div>
    </>
  )
}

export default App
