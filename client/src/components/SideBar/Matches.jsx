// //======PAQUETES Y LIBRERIAS
// import * as React from "react";
// import { NavLink } from "react-router-dom";
// //======IMPORTACIONES DE COMPONENTES
// //======IMPORTACIONES DE FUNCIONES NUESTRAS

// //======ESTILO E IMAGENES
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
// import { Button, IconButton } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

// const user = [
//   {
//     name: "pedro",
//     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "Breakfast",
//   },
//   {
//     name: "juan",
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//   },
//   {
//     name: "martin",
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//   },
//   {
//     name: "jose",
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//   },
//   {
//     name: "pepe",
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//   },
//   {
//     name: "tim",
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//   },
//   {
//     name: "tincho",
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//   },
//   {
//     name: "juan",
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//   },
//   {
//     name: "albert",
//     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//   },
//   {
//     name: "artur",
//     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//   },
//   {
//     name: "juli",
//     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//   },
//   {
//     name: "marian",
//     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//   },
// ];

// export default function Matches() {
//   return (
//     <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//       {user.map((us) => {
//         <ListItem key={us.name} alignItems="flex-start">
//           <ListItemAvatar>
//             <Avatar alt={us.name} src={us.img} />
//           </ListItemAvatar>
//           <ListItemText
//             primary={us.name}
//             secondary={"Broo, hacemos PP? Estuve viendo la clase de Mart…"}
//             sx={{ color: "primary.contrastText" }}
//           />
//           <IconButton color="primary" size="large">
//             <NavLink to={"/chatroom"}>
//               <SendIcon />
//             </NavLink>
//           </IconButton>
//         </ListItem>;

//         <Divider variant="inset" component="li" color="primary" />;
//       })}
//       {/*       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Trinidad"
//           secondary={"...Que buscas en la app? :)"}
//           sx={{ color: "primary.contrastText" }}
//         />
//         <IconButton color="primary" size="large">
//           <SendIcon />
//         </IconButton>
//       </ListItem>

//       <Divider variant="inset" component="li" />

//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Camilo"
//           secondary={"Buenos dias! Soy estudiante del M1, quisiera consu..."}
//         />
//         <IconButton color="primary" size="large">
//           <SendIcon />
//         </IconButton>
//       </ListItem>
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Camilo"
//           secondary={"Buenos dias! Soy estudiante del M1, quisiera consu..."}
//         />
//         <IconButton color="primary" size="large">
//           <SendIcon />
//         </IconButton>
//       </ListItem>
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Camilo"
//           secondary={"Buenos dias! Soy estudiante del M1, quisiera consu..."}
//         />
//         <IconButton color="primary" size="large">
//           <SendIcon />
//         </IconButton>
//       </ListItem>
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Camilo"
//           secondary={"Buenos dias! Soy estudiante del M1, quisiera consu..."}
//         />
//         <IconButton color="primary" size="large">
//           <SendIcon />
//         </IconButton>
//       </ListItem>
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Camilo"
//           secondary={"Buenos dias! Soy estudiante del M1, quisiera consu..."}
//         />
//         <IconButton color="primary" size="large">
//           <SendIcon />
//         </IconButton>
//       </ListItem>
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Camilo"
//           secondary={"Buenos dias! Soy estudiante del M1, quisiera consu..."}
//         />
//         <IconButton color="primary" size="large">
//           <SendIcon />
//         </IconButton>
//       </ListItem>
//  */}{" "}
//     </List>
//   );
// }
