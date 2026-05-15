import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { useThemeStore } from './store/themeStore'
import { Sun, Moon } from 'lucide-react'

// Placeholder component to render inside the MainLayout's Outlet
function PlaceholderChatArea() {
  const { theme, toggleTheme } = useThemeStore()
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 relative">
      <button 
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-full bg-brand-surface border border-white/10 hover:bg-white/10 transition-colors text-brand-text cursor-pointer"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="flex flex-col items-center justify-center opacity-20 select-none pointer-events-none">
        <div className="w-24 h-24 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(108,99,255,0.5)]">
          <span className="text-brand-primary font-bold text-5xl">O</span>
        </div>
        <h1 className="text-2xl font-bold tracking-[0.2em] uppercase text-brand-text">
          Orionix
        </h1>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Default route renders inside the MainLayout */}
        <Route path="/" element={<PlaceholderChatArea />} />
      </Route>
    </Routes>
  )
}
