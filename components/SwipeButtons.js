import React from 'react'
import SwipeStyles from '../styles/SwipeButtons.module.css';
import ReplyIcon from '@mui/icons-material/Reply';
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ForumIcon from '@mui/icons-material/Forum';
import Person4Icon from '@mui/icons-material/Person4';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Link from 'next/link';

function SwipeButtons({onShowBrowse, onShowProfile, onShowEdit, onShowLikes}) {

  return (
    
    <div className={SwipeStyles.swipeButtons}>
       {/* <IconButton className={SwipeStyles.swipeButtons__repeat}>
        <ReplyIcon fontSize="large" className={SwipeStyles.swipeButtons__all}/>
      </IconButton> */}

      <IconButton className={SwipeStyles.swipeButtons__left} onClick={onShowEdit} title='Edit Profile'>
        <EditIcon fontSize="large" className={SwipeStyles.swipeButtons__all}/>
      </IconButton> 

      <IconButton className={SwipeStyles.swipeButtons__star} onClick={onShowProfile} title='Your Profile'>
        <Person4Icon fontSize="large" className={SwipeStyles.swipeButtons__all}/>
      </IconButton>

      <IconButton className={SwipeStyles.swipeButtons__right} onClick={onShowLikes} title='Your Likes'>
        <FavoriteIcon fontSize="large" className={SwipeStyles.swipeButtons__all}/>
      </IconButton>
      <IconButton className={SwipeStyles.swipeButtons__lightning} onClick={onShowBrowse} title='Browse and Swipe'>
        <FlashOnIcon fontSize="large" className={SwipeStyles.swipeButtons__all}/>
      </IconButton>
    </div>
  )
}

export default SwipeButtons