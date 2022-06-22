import React from 'react';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../assets/logo.png';
import "../Header/Header.css";  /* "../styles/Header.css" */
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <IconButton>
        <PersonIcon fontSize='large'/>
        </IconButton>
        <img className='logo' src = {logo} alt='logo'/>
        <IconButton>
        <ForumIcon fontSize='large'/>
        </IconButton>
    </div>
  )
}

export default Header