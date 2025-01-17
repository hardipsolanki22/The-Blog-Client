import React from 'react'

import Users from './Users'

function RightAside() {

  return (
    <aside className='md:col-span-3 md:block hidden border border-slate-600'>
      <div className='md:block flex flex-col gap-4 p-4'>
        <Users />
      </div>
    </aside>
  )
}

export default RightAside
