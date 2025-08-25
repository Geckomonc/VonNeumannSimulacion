import { NavLink } from 'react-router-dom'

export default function TopNav() {
  return (
    <header className="topbar">
      <nav className="nav">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/primer-modelo">Primer modelo</NavLink>
        <NavLink to="/segundo-modelo">Segundo modelo</NavLink>
      </nav>
    </header>
  )
}
