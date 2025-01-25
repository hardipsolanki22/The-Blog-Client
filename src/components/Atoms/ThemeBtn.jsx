import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

import { useTheme } from '../Contexts/theme'

function ThemeBtn() {
  const { themeMode, toggleMode } = useTheme()

  const onChangeBtn = (e) => {
    toggleMode()
  }


  return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={onChangeBtn}
          checked={themeMode === false}
        />
        <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none
            rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
             peer-checked:after:border-white after:content-[''] after:absolute 
             after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
             after:border after:rounded-full after:h-5 after:w-5 after:transition-all
              dark:border-gray-600 peer-checked:bg-blue-600">
          <div>
            <FontAwesomeIcon
              className='ml-1'
              icon={faMoon} />
            <FontAwesomeIcon
              className='ml-2'
              icon={faSun} />
          </div>
        </div>
        <span className='ml-2 font-semibold block sm:hidden md:block'>Mode</span>
      </label>
  )
}

export default ThemeBtn
