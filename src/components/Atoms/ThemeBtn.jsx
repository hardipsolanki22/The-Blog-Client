import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

import { useTheme } from '../Contexts/theme'

function ThemeBtn() {
  const { themeMode, toggleMode } = useTheme()

  const onChangeBtn = (e) => {
    console.log(`click`);
    toggleMode()
  }


  return (
    <li className='flex justify-center items-center'>
      <input
        className='p-12'
        type="checkbox"
        value=''
        checked={themeMode === false}
        onChange={onChangeBtn}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer"> <div className="dot w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out peer-checked:translate-x-5"></div> </div>
      <span><FontAwesomeIcon icon={faMoon} /></span>
    </li>
  )
}

export default ThemeBtn
