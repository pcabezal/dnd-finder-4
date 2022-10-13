import React from 'react'
import SwipeStyles from '../styles/SwipeButtons.module.css';
import ReplyIcon from '@mui/icons-material/Reply';
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { IconButton } from '@mui/material';

function SwipeButtons({isActive, onShow}) {

  return (
    
    <div className={SwipeStyles.swipeButtons}>
      <IconButton className={SwipeStyles.swipeButtons__repeat}>
        <ReplyIcon fontSize="large" className={SwipeStyles.swipeButtons__all}/>
      </IconButton>
      <IconButton className={SwipeStyles.swipeButtons__left}>
        <CloseIcon fontSize="large" className={SwipeStyles.swipeButtons__all}/>
      </IconButton>
      <IconButton className={SwipeStyles.swipeButtons__star}>
        <StarIcon fontSize="large" className={SwipeStyles.swipeButtons__all}/>
      </IconButton>
      <IconButton className={SwipeStyles.swipeButtons__right} onClick={onShow}>
        <FavoriteIcon fontSize="large" className={SwipeStyles.swipeButtons__all}/>
      </IconButton>
      <IconButton className={SwipeStyles.swipeButtons__lightning}>
        <FlashOnIcon fontSize="large" className={SwipeStyles.swipeButtons__all}/>
      </IconButton>
    </div>
  )
}

export default SwipeButtons