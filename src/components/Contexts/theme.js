import {createContext, useContext} from 'react'

export const ThemeContext = createContext({
    themeMode: true,
    toggleMode: () => {}
})

export const ThemeProvider = ThemeContext.Provider

export const useTheme = () => {
    return useContext(ThemeContext)
}