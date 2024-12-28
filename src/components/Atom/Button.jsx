import React from 'react'

function Button({
    type = "submit",
    bgColor = "bg-white",
    textColor = "text-black",
    className = "",
    children,
    ...props
}) {
  return (
    <button className={`${bgColor} 
    ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button