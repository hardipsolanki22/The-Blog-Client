import React, { useId, forwardRef } from 'react'

function Select({
  options = [],
  label,
  className = ""
}, ref) {
  const id = useId()
  console.log(`opation : `, options);

  return (
    <div className='m-4'>
      {label &&
        <label htmlFor={id}>
          {label}
        </label>
      }
      <select ref={ref} id={id}
        className={className}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
        }
      </select>
    </div>
  )
}
export default forwardRef(Select)
