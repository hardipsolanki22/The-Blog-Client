import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

import { useTheme } from '../Contexts/theme'

function ThemeBtn() {
    const {themeMode, toggleMode} = useTheme()

    const onChangeBtn = (e) => {
        console.log(`click`);
       toggleMode() 
        // const darkModeStatus = e.currentTarget.checked

        // if (darkModeStatus) toggleMode()
        // else toggleMode()
    }

    console.log(`mode: `, themeMode);
    

  return (
    <li className='flex justify-center items-center'>
        <input 
         className='p-12'
        type="checkbox"
        value=''
         checked={themeMode === false}
        onChange={onChangeBtn}
        />
            <span><FontAwesomeIcon icon={faMoon} /></span>
    </li>
  )
}

export default ThemeBtn
