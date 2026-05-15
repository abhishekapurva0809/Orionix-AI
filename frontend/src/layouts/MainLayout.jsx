import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import TopNavbar from '../components/TopNavbar'
import Sidebar from '../components/Sidebar'
import { useUIStore } from '../store/uiStore'

export default function MainLayout() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore()

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text grid grid-cols-1 md:grid-cols-[280px_1fr]">
      
      {/* Desktop Sidebar (Always Visible on md+) */}
      <aside className="hidden md:flex flex-col glass-panel border-y-0 border-l-0 rounded-none h-screen p-4 sticky top-0 w-[280px]">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar & Overlay (Animated) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sliding Sidebar */}
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] flex flex-col glass-panel border-y-0 border-l-0 rounded-none h-screen p-4 md:hidden"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex flex-col h-screen overflow-hidden w-full relative">
        <TopNavbar onMenuClick={() => setMobileMenuOpen(true)} />
        
        {/* Dynamic Pages Render Here */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
