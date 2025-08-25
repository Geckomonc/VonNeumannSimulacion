import { useLocation, useNavigate } from 'react-router-dom'

const order = ['/', '/primer-modelo', '/segundo-modelo']

export default function FooterNav() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const i = order.indexOf(pathname)

  return (
    <footer className="footer-nav">
      

      <span className="copyright">© 2025 Simulador Von Neumann</span>

      
    </footer>
  )
}
