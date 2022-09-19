import Meta from '../components/Meta'
import Browse from '../components/Browse'
import CardStyles from '../styles/Cards.module.css';
import React from "react" 
React.useLayoutEffect = React.useEffect // stop console error

const aboot = () => {
  return (
    <div>
      <Meta title='aboot yo' />
      aboot
      <div>
        <Browse />
      </div>


    </div>
  )
}

export default aboot