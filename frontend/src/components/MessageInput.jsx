import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Mic } from 'lucide-react'
import { cn } from '../utils'

export default function MessageInput() {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [message])

  const handleSend = () => {
    if (!message.trim()) return
    console.log('Sending message:', message)
    // TODO: Phase 6 - Hook this up to chatStore to add a message
    setMessage('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (message.trim()) {
        handleSend()
      } else {
        setMessage('')
      }
    }
  }

  return (
    <div className="w-full px-4 pb-4 md:px-6 md:pb-6 relative z-20">
      <div className="relative flex items-end w-full max-w-3xl mx-auto glass-panel p-2 rounded-[24px] border border-white/10 shadow-lg focus-within:border-brand-primary/50 focus-within:shadow-[0_0_30px_rgba(108,99,255,0.2)] transition-all duration-300 bg-brand-surface/60 backdrop-blur-xl">
        
        <button 
          className="p-2.5 text-brand-muted hover:text-brand-text transition-colors cursor-pointer rounded-full hover:bg-white/5 shrink-0 mb-0.5" 
          title="Attach file"
        >
          <Paperclip size={20} />
        </button>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Orionix AI..."
          className="flex-1 max-h-[200px] min-h-[44px] bg-transparent border-none focus:outline-none resize-none py-3 px-2 text-brand-text placeholder-brand-muted text-[15px] leading-relaxed no-scrollbar"
          rows={1}
        />

        <div className="flex items-center gap-1 shrink-0 p-1 mb-0.5">
          {!message.trim() ? (
            <button 
              className="p-2.5 text-brand-muted hover:text-brand-text transition-colors cursor-pointer rounded-full hover:bg-white/5" 
              title="Voice input"
            >
              <Mic size={20} />
            </button>
          ) : (
            <button 
              onClick={handleSend}
              className="p-2 bg-brand-primary text-white rounded-full hover:bg-[#5a52d5] transition-all cursor-pointer shadow-[0_0_15px_rgba(108,99,255,0.4)] hover:scale-105" 
              title="Send message"
            >
              <Send size={18} className="translate-x-[1px] translate-y-[1px]" />
            </button>
          )}
        </div>
      </div>
      <div className="text-center mt-3 text-[11px] text-brand-muted opacity-70">
        Orionix AI can make mistakes. Consider verifying important information.
      </div>
    </div>
  )
}
