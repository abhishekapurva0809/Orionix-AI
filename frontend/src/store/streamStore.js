import { create } from 'zustand'

export const useStreamStore = create((set) => ({
  isStreaming: false,
  streamedText: '',
  
  setStreaming: (status) => set({ isStreaming: status }),
  setStreamedText: (text) => set({ streamedText: text }),
  appendStreamedText: (chunk) => set((state) => ({ streamedText: state.streamedText + chunk })),
  resetStream: () => set({ isStreaming: false, streamedText: '' })
}))
