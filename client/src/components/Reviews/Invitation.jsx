//======PAQUETES Y LIBRERIAS

//======IMPORTACIONES DE COMPONENTES

//======IMPORTACIONES DE FUNCIONES NUESTRAS

//======ESTILO E IMAGENES
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import imgp4 from "./UsersImg/pareja/4.jpg";
import { NavLink } from "react-router-dom";

export const Invitation = () => {
  return (
    <Card sx={{ display: "flex" /* width: "100%" */ }}>
      <CardMedia
        component="img"
        sx={{ width: 110 }}
        image={imgp4}
        alt="HM <3"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Reviews
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div">
            Comparte con los demás tu experiencia!
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <NavLink to="/profile">
            <IconButton>
              <StarBorderPurple500Icon fontSize="small" color="primary" />
              <StarBorderPurple500Icon fontSize="medium" color="primary" />
              <StarBorderPurple500Icon fontSize="large" color="primary" />
            </IconButton>
          </NavLink>
        </Box>
      </Box>
    </Card>
  );
};
export default Invitation;
