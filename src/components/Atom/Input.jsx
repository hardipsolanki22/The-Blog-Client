import React, { useId } from 'react'

function Input({
    type = "text",
    label,
    placeholder,
    className = "",
    ...props
}, ref) {

    const id = useId()
    return (
        <div className='m-4'>
            {label && <label
                htmlFor={id}>
                {label}
            </label>}
            <input
                type={type}
                id={id}
                placeholder={type !== "file" && placeholder}
                className={className}
                ref={ref}
                {...props}
            />
        </div>
    )
}

export default React.forwardRef(Input)
