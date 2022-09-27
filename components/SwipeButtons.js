import React from 'react'
import SwipeStyles from '../styles/SwipeButtons.module.css';
import ReplyIcon from '@mui/icons-material/Reply';
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { IconButton } from '@mui/material';

function SwipeButtons() {
  function handleClick() {
    console.log('increment fetor count');
  }

  return (
    
    <div className={SwipeStyles.swipeButtons}>
      <IconButton className={SwipeStyles.swipeButtons__repeat}>
        <ReplyIcon fontSize="large" />
      </IconButton>
      <IconButton className={SwipeStyles.swipeButtons__left}>
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className={SwipeStyles.swipeButtons__star}>
        <StarIcon fontSize="large" />
      </IconButton>
      <IconButton className={SwipeStyles.swipeButtons__right}>
        <FavoriteIcon fontSize="large" />
      </IconButton>
      <IconButton className={SwipeStyles.swipeButtons__lightning} onClick={handleClick}>
        <FlashOnIcon fontSize="large" />
      </IconButton>
    </div>
  )
}

export default SwipeButtons