import React, { useId } from 'react'

function Input({
    type,
    label,
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
                className={className}
                ref={ref}
                {...props}
            />
        </div>
    )
}

export default React.forwardRef(Input)
