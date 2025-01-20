import React, { useId, forwardRef } from 'react'

function Select({
  options,
  label,
  className = "",
  ...props
}, ref) {
  const id = useId()

  return (
    <div className='m-4 w-full'>
      {label &&
        <label htmlFor={id} className='block'>
          {label}
        </label>
      }
      <select 
      ref={ref}
       id={id}
        {...props}
        className={`${className} py-2 px-3 rounded-md`}>
        {options?.map((option) => (
          <option  key={option} value={option}>
            {option}
          </option>
        ))
        }
      </select>
    </div>
  )
}
export default forwardRef(Select)

