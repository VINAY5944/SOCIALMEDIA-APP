import React from 'react'
import './leftside.css'
import Infocard from './Infocard'
import Followerscard from '../../profileside/Followerscard'
import Search from '../../profileside/Search'
function Leftside() {
  return (
    <div>
<Search/>
<Infocard/>
<Followerscard/>
    </div>
  )
}

export default Leftside