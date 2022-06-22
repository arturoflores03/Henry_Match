import React from 'react'
import '../ButtonSwipe/ButtonSwipe.css'
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import { IconButton } from '@mui/material';
import { Grid } from '@mui/material';

function ButtonSwipe() {
  return (
    <div className='buttonSwipe'>
        <Grid item xl={12} spacing={3} >
        <IconButton className='buttonSwipe__replay'>
            <ReplayIcon font='large'/> 
        </IconButton>
        </Grid>
        <IconButton className='buttonSwipe__close'>
            <CloseIcon font='large'/> 
        </IconButton>

        <IconButton className='buttonSwipe__star'>
            <StarPurple500Icon font='large'/> 
        </IconButton>

        <IconButton className='buttonSwipe__fav'>
            <FavoriteIcon font='large'/> 
        </IconButton>

        <IconButton className='buttonSwipe__bolt'>
            <BoltIcon font='large'/> 
        </IconButton>
        
    </div>
  )
}

export default ButtonSwipe