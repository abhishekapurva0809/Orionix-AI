import { Menu } from 'lucide-react'

export default function TopNavbar({ onMenuClick }) {
  return (
    <header className="md:hidden flex items-center justify-between h-14 px-4 glass-panel rounded-none border-x-0 border-t-0 sticky top-0 z-40 bg-brand-surface/80">
      <div className="flex items-center gap-2">
        <div className="glass-glow flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10">
          <span className="text-brand-primary font-bold text-sm">O</span>
        </div>
        <span className="font-bold text-lg text-brand-text tracking-tight">Orionix</span>
      </div>
      
      <button 
        onClick={onMenuClick}
        className="p-2 -mr-2 text-brand-muted hover:text-brand-text transition-colors cursor-pointer"
        aria-label="Toggle Sidebar Menu"
      >
        <Menu size={24} />
      </button>
    </header>
  )
}
