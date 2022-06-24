import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Matches() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Rodrigo"
          secondary={"Broo, hacemos PP? Estuve viendo la clase de Mart…"}
        />
         <IconButton startIcon={<SendIcon />} color='secondary' size="large">
            < SendIcon/>
         </IconButton>
      </ListItem>

      <Divider variant="inset" component="li" />

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Trinidad"
          secondary= {"...Que buscas en la app? :)"}
        />
          <IconButton startIcon={<SendIcon />} color='secondary' size="large">
            < SendIcon/>
         </IconButton>
      </ListItem>

      <Divider variant="inset" component="li" />

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Camilo"
          secondary= {'Buenos dias! Soy estudiante del M1, quisiera consu...'}
        />
         <IconButton startIcon={<SendIcon />} color='secondary' size="large">
            < SendIcon/>
         </IconButton>
      </ListItem>
    </List>
  );
}
