import React, { useEffect, useRef } from 'react';
import HeaderStyles from '../styles/Header.module.css';
import Person4Icon from '@mui/icons-material/Person4';
import { IconButton } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import Image from 'next/image'
import DragonIcon from '../asset/dragon.png'
import ReplyIcon from '@mui/icons-material/Reply';
import Link from 'next/link';


function Header() {

  return (
    <div className={HeaderStyles.header}>

        <Link href='profile'>
          <IconButton title='Your Profile'>
              <Person4Icon fontSize="large" className={HeaderStyles.header__icon} />
          </IconButton>
        </Link>

        <Image src={DragonIcon} className={HeaderStyles.header__logo} alt='dragon' height='60px' width='60px'/>

        <Link href='dashboard'>
          <IconButton title='Browse and Swipe'>
              <ForumIcon fontSize="large" className={HeaderStyles.header__icon}/>
          </IconButton>
        </Link>

    </div>
  )
}

export default Header;