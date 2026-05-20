import { motion } from 'framer-motion'
import { useChatStore } from '../store/chatStore'

export default function ChatArea() {
  const { activeSessionId, sessions } = useChatStore()
  
  const activeSession = sessions.find(s => s._id === activeSessionId)

  if (!activeSession) return null

  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar scroll-smooth p-4 md:p-6 flex flex-col gap-6 relative z-10">
      {/* Date/Context Badge */}
      <div className="text-center text-[10px] font-medium text-brand-muted my-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/5 self-center backdrop-blur-md uppercase tracking-widest shadow-sm">
        {activeSession.title}
      </div>
      
      {/* Temporary placeholders before Phase 6 */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] md:max-w-[75%] bg-brand-primary text-white px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-[0_4px_20px_rgba(108,99,255,0.2)] text-sm leading-relaxed">
          Hello! I need help writing a React component.
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-start"
      >
        <div className="max-w-[85%] md:max-w-[75%] glass-panel border border-white/10 px-5 py-3.5 rounded-2xl rounded-tl-sm text-brand-text shadow-xl text-sm leading-relaxed">
          I'd be happy to help you with that! What kind of React component are you looking to build?
        </div>
      </motion.div>
    </div>
  )
}
