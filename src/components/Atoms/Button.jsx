import React from 'react'
import { useTheme } from '../Contexts/theme'

function Button({
  type = "submit",
  className,
  children,
  ...props
}) {

  const { themeMode } = useTheme()

  return (
    <button
      type={type}
      className={`${themeMode ? 'text-white bg-purple-600 hover:bg-purple-700'
        : 'bg-blue-500 hover:bg-blue-600 text-white'}
         ${className}  `}
      {...props}>
      {children}
    </button>
  )
}

export default Button
