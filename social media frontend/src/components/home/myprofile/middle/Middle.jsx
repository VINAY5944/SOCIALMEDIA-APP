import React from 'react'

import Profilecard from '../../profileside/Profilecard'
import Myposts from './Myposts'
import Myprofcard from './Myprofcard'

function Middle() {
  return (
    <div>
    <Myprofcard/>
      <Myposts/>
    </div>
  )
}

export default Middle