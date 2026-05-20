import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ChatPage from './pages/ChatPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Default route renders inside the MainLayout */}
        <Route path="/" element={<ChatPage />} />
      </Route>
    </Routes>
  )
}
