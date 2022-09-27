import React from 'react';
import HeaderStyles from '../styles/Header.module.css';
import Person4Icon from '@mui/icons-material/Person4';
import { IconButton } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import Image from 'next/image'
import DragonIcon from '../asset/dragon.png'
import ReplyIcon from '@mui/icons-material/Reply';

function Header() {
  return (
    <div className={HeaderStyles.header}>
        <IconButton>
            <ReplyIcon fontSize="large" className={HeaderStyles.header__icon}/>
        </IconButton>

        <Image src={DragonIcon} className={HeaderStyles.header__logo} alt='dragon' height='40px' width='40px'/>

        <IconButton>
            <ForumIcon className={HeaderStyles.header__icon}/>
        </IconButton>

    </div>
  )
}

export default Header;