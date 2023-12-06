import React from 'react'
import Leftsidesecondpersonprofile from './leftside/Leftsidesecondpersonprofile'
import Rightsidesecondpersonprof from './rightside/Rightsidesecondpersonprof'
import Middlepartsecondpersonprofile from './middlepart/Middlepartsecondpersonprofile'
import './second_person_prof.css'
const Second_person_prof = () => {
  return (
    <div className='secondpersonmain'  >
<Leftsidesecondpersonprofile/>
<Middlepartsecondpersonprofile/>
<Rightsidesecondpersonprof/>
    </div>
  )
}

export default Second_person_prof