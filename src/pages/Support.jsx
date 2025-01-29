import React from 'react'
import supportImage from '../assets/3D contact developer for any issue.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

function Support() {
  return (
    <div className='sm:col-span-11 md:col-span-6 h-screen no-scrollbar
           sm:overflow-y-auto flex flex-col justify-center items-center'>
      <div className='w-[60%] sm:w-[70%]'>
        <img src={supportImage}
          className='rounded-md'
          alt="support" />
      </div>
      <div className='p-4 flex flex-col justify-center items-center my-4 gap-2'>
        <p className='text-2xl font-medium break-words'>Contact me for any issue and support</p>
        <a
          href="https://github.com/hardipsolanki22"
          target='_blank'
          className='text-blue-500'>
          <FontAwesomeIcon icon={faLink} />
          <span className='ml-2'>Github</span>
        </a>
        <a
          href="https://x.com/HardipSola71175"
          target='_blank'
          className='text-blue-500'>
          <FontAwesomeIcon icon={faLink} />
          <span className='ml-2'>X</span>
        </a>
        <a
          href="https://www.youtube.com/@hardipofficial3501"
          target='_blank'
          className='text-blue-500'>
          <FontAwesomeIcon icon={faLink} />
          <span className='ml-2'>YouTube</span>
        </a>
      </div>

    </div>
  )
}

export default Support
