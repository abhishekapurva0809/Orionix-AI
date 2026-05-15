import { create } from 'zustand'

export const useChatStore = create((set) => ({
  sessions: [],
  activeSessionId: null,
  isLoading: false,
  
  setSessions: (sessions) => set({ sessions }),
  setActiveSession: (id) => set({ activeSessionId: id }),
  addSession: (session) => set((state) => ({ sessions: [session, ...state.sessions] })),
  removeSession: (id) => set((state) => ({ sessions: state.sessions.filter(s => s._id !== id) })),
  updateSession: (id, updates) => set((state) => ({
    sessions: state.sessions.map(s => s._id === id ? { ...s, ...updates } : s)
  }))
}))
