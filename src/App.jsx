import { Routes, Route, Navigate } from 'react-router-dom'
import TopNav from './components/TopNav.jsx'
import FooterNav from './components/FooterNav.jsx'
import Home from './pages/Home.jsx'
import FirstModel from './pages/FirstModel.jsx'
import SecondModel from './pages/SecondModel.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <TopNav />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/primer-modelo" element={<FirstModel />} />
          <Route path="/segundo-modelo" element={<SecondModel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <FooterNav />
    </div>
  )
}


