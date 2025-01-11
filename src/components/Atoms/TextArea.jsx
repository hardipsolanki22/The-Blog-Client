import React, { useId } from 'react'

function TextArea({
    label,
    placeholder,
    className = "",
    ...props
}, ref) {

    const id = useId()

    return (
        <div className='m-4'>
            {label && 
            <label htmlFor={id}>
                {label}
            </label>}
            <textarea
                placeholder={placeholder}
                className={className}
                id={id}
                ref={ref}
                {...props}
                >
            </textarea>
        </div>
    )
}

export default React.forwardRef(TextArea)
