import { create } from 'zustand'

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('orionix-theme')) {
    return localStorage.getItem('orionix-theme')
  }
  return 'dark' // Cinematic Futurism defaults to dark
}

export const useThemeStore = create((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('orionix-theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    return { theme: newTheme }
  }),
}))

// Initialize the DOM class immediately upon load
if (typeof window !== 'undefined') {
  if (getInitialTheme() === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
