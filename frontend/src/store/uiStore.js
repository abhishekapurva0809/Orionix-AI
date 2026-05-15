import { create } from 'zustand'

export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  
  setMobileMenuOpen: (status) => set({ isMobileMenuOpen: status }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false })
}))
