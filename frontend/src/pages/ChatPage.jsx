import { useThemeStore } from '../store/themeStore'
import { useChatStore } from '../store/chatStore'
import { Sun, Moon, Sparkles } from 'lucide-react'
import ChatArea from '../components/ChatArea'
import SmartEmptyState from '../components/SmartEmptyState'

export default function ChatPage() {
  const { theme, toggleTheme } = useThemeStore()
  const { activeSessionId } = useChatStore()

  return (
    <div className="flex flex-col h-full w-full relative bg-brand-bg text-brand-text">
      {/* Upper Navigation / Control Bar inside the Chat Page */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 glass-panel rounded-none border-t-0 border-x-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
            <Sparkles size={16} className="text-brand-primary animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-wide">Orionix AI</h1>
            <p className="text-[10px] text-brand-muted">Cinematic Intelligence Engine</p>
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-lg bg-brand-surface border border-white/10 hover:bg-white/10 hover:border-brand-primary/40 transition-all text-brand-text cursor-pointer duration-300"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col items-center relative overflow-hidden h-full max-h-full">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />

        {!activeSessionId ? (
          <div className="flex-1 w-full max-w-4xl flex flex-col relative z-10 h-full">
            <SmartEmptyState />
            {/* MessageInput will go here in Step 5.3 */}
          </div>
        ) : (
          <div className="flex-1 w-full max-w-4xl flex flex-col relative z-10 h-full">
            <ChatArea />
            {/* MessageInput will go here in Step 5.3 */}
          </div>
        )}
      </div>
    </div>
  )
}
