import React,{useId} from 'react'

function Select({
    options = [],
    label,
    className = ""

}, ref) {

    const id = useId()

  return (
    <div className='m-4'>
      {label && <label htmlFor={id}>
        {label}
        </label>
    }
    <select id={id}>
        {options?.map((option) => (
            <option value={option} key={option}>
                {option}
            </option>
        ))}
    </select>
    </div>
  )
}

export default Select
