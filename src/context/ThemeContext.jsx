import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev
      localStorage.setItem('theme', newTheme ? 'dark' : 'light')
      return newTheme
    })
  }

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      bg: isDark ? '#000000' : '#ffffff',
      text: isDark ? '#ffffff' : '#ffffff',
      textSecondary: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.9)',
      cardBg: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.4)',
      cardBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)',
      glassBg: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.3)',
      glassBorder: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.2)',
      shadow: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)',
      shadowHover: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.25)',
      buttonBg: isDark ? '#ffffff' : '#000000',
      buttonText: isDark ? '#000000' : '#ffffff',
      buttonHoverBg: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}
