import React from 'react'
import Search from './Search'
import Users from './Users'

function RightAside() {
  return (
   <aside className='md:col-span-3 md:block hidden border border-slate-600 bg-black text-white'>
    <div className='flex flex-col gap-4 p-4'>
        <Search/>
        <Users/>
    </div>
   </aside>
  )
}

export default RightAside
