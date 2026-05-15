import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '../store/uiStore'
import { useChatStore } from '../store/chatStore'
import { Plus, MessageSquare, Search, Pin, Trash2, Edit2, Settings, LogOut } from 'lucide-react'
import { cn } from '../utils'

// Placeholder Data
const MOCK_CHATS = [
  { _id: '1', title: 'React Hooks Explained', isPinned: true },
  { _id: '2', title: 'Tailwind CSS Grid Layouts', isPinned: false },
  { _id: '3', title: 'Zustand vs Redux', isPinned: false },
]

export default function Sidebar() {
  const { setMobileMenuOpen } = useUIStore()
  const { sessions, setSessions, updateSession, removeSession } = useChatStore()
  const [searchQuery, setSearchQuery] = useState('')
  
  // Inline edit state
  const [editingChatId, setEditingChatId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const editInputRef = useRef(null)

  // Delete modal state
  const [chatToDelete, setChatToDelete] = useState(null)

  // Initialize with mock data if empty
  useEffect(() => {
    if (sessions.length === 0) {
      setSessions(MOCK_CHATS)
    }
  }, [sessions.length, setSessions])

  // Focus input when editing starts
  useEffect(() => {
    if (editingChatId && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingChatId])

  // Function to close sidebar on mobile when a link is clicked
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  const startEditing = (e, chat) => {
    e.stopPropagation()
    setEditingChatId(chat._id)
    setEditTitle(chat.title)
  }

  const saveEdit = (e, chatId) => {
    e?.stopPropagation()
    if (editTitle.trim()) {
      updateSession(chatId, { title: editTitle.trim() })
    }
    setEditingChatId(null)
  }

  const cancelEdit = (e) => {
    e?.stopPropagation()
    setEditingChatId(null)
  }

  const togglePin = (e, chat) => {
    e.stopPropagation()
    updateSession(chat._id, { isPinned: !chat.isPinned })
  }

  const confirmDelete = (e, chat) => {
    e.stopPropagation()
    setChatToDelete(chat)
  }

  const handleDelete = () => {
    if (chatToDelete) {
      removeSession(chatToDelete._id)
      setChatToDelete(null)
    }
  }

  return (
    <>
      <div className="font-bold text-xl text-brand-primary mb-6 px-2 tracking-tight">Orionix</div>
      
      {/* New Chat Button */}
      <div className="px-2 mb-6">
        <button 
          onClick={handleLinkClick}
          className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#5a52d5] text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 glass-glow cursor-pointer"
        >
          <Plus size={18} />
          <span>New Chat</span>
        </button>
      </div>
      
      {/* Search History */}
      <div className="px-2 mb-4">
        <div className="relative">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input 
            type="text" 
            placeholder="Search chats..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-bg border border-white/5 rounded-lg py-1.5 pl-9 pr-3 text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-1 px-2">
        <div className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2 px-1 mt-2">Recent Chats</div>
        
        {sessions.map((chat) => (
          <div 
            key={chat._id}
            className="group flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg cursor-pointer transition-colors h-10"
          >
            {editingChatId === chat._id ? (
              <div className="flex items-center gap-3 w-full h-full overflow-hidden px-0" onClick={e => e.stopPropagation()}>
                <MessageSquare size={16} className="shrink-0 text-brand-primary" />
                <input 
                  ref={editInputRef}
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(e, chat._id)
                    if (e.key === 'Escape') cancelEdit(e)
                  }}
                  onBlur={(e) => saveEdit(e, chat._id)}
                  className="flex-1 bg-transparent border-b border-brand-primary/50 px-0 py-0.5 text-sm text-brand-text focus:outline-none focus:border-brand-primary focus:shadow-[0_1px_8px_rgba(108,99,255,0.4)] transition-all min-w-0"
                />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 overflow-hidden">
                  <MessageSquare size={16} className={cn("shrink-0", chat.isPinned ? "text-brand-primary" : "text-brand-muted")} />
                  <span className="text-sm text-brand-text truncate">{chat.title}</span>
                </div>
                
                {/* Hover Actions */}
                <div className="hidden group-hover:flex items-center gap-1 shrink-0 pl-1">
                  <button 
                    onClick={(e) => togglePin(e, chat)}
                    className="p-1 text-brand-muted hover:text-brand-primary transition-colors cursor-pointer" 
                    title={chat.isPinned ? "Unpin" : "Pin"}
                  >
                    <Pin size={14} className={chat.isPinned ? "fill-brand-primary text-brand-primary" : ""} />
                  </button>
                  <button 
                    onClick={(e) => startEditing(e, chat)}
                    className="p-1 text-brand-muted hover:text-white transition-colors cursor-pointer" 
                    title="Rename"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={(e) => confirmDelete(e, chat)}
                    className="p-1 text-brand-muted hover:text-red-400 transition-colors cursor-pointer" 
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-white/10 mx-2 flex flex-col gap-1 mb-2">
        <button className="flex items-center gap-3 w-full text-brand-text text-sm py-2.5 px-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors text-left">
          <Settings size={18} className="text-brand-muted" />
          <span>Settings</span>
        </button>
        
        <div className="group flex items-center justify-between py-2 px-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors mt-1">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 shrink-0 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold shadow-[0_0_10px_rgba(108,99,255,0.2)]">
              U
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-medium text-brand-text truncate">User Profile</span>
              <span className="text-xs text-brand-muted truncate">user@orionix.ai</span>
            </div>
          </div>
          
          <button className="p-1.5 text-brand-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {chatToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              onClick={() => setChatToDelete(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative glass-panel w-full max-w-sm p-6 rounded-xl border border-white/10 shadow-2xl flex flex-col gap-4"
            >
              <h3 className="text-lg font-bold text-brand-text">Delete Chat</h3>
              <p className="text-sm text-brand-muted">
                Are you sure you want to delete <span className="text-brand-primary font-medium">"{chatToDelete.title}"</span>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 mt-2">
                <button 
                  onClick={() => setChatToDelete(null)}
                  className="px-4 py-2 text-sm font-medium text-brand-text hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
