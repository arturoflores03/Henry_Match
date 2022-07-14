//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

//======IMPORTACIONES DE COMPONENTES
//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { updateUser, createUser } from "../../Redux/actions";

//======ESTILO E IMAGENES
import "./ReviewField.css";
import {
  Button,
  Paper,
  TextareaAutosize,
  Box,
  TextField,
  Stack,
  Rating,
  Typography,
  FormControl,
  FormLabel,
  Divider,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import { shadows } from "@mui/system";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import imgp6 from "./UsersImg/pareja/6.jpg";
import imgp7 from "./UsersImg/pareja/7.jpg";

const initialForm = {
  review: "",
  rating: 2,
};

const labels = {
  0.5: "No la recomiendo",
  1: "Le falta onda",
  1.5: "Nada nuevo",
  2: "Normal",
  2.5: "Ok",
  3: "Bien",
  3.5: "Va bastante Bien",
  4: "Tiene toda la onda",
  4.5: "Excelente",
  5: "Perfecta!",
};

function getLabelText(rating) {
  return `${rating} Star${rating !== 1 ? "s" : ""}, ${labels[rating]}`;
}

const ReviewField = () => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  //VALORACION
  const [rating, setRating] = useState(2);
  const [hover, setHover] = useState();
  const [reviewForm, setReviewForm] = useState(initialForm);

  //PARA RENDERIZAR ALGUN ERROR DE LA VALIDACION
  const [errors, setErrors] = useState({});

  //ESTRELLAS
  const handleRating = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setReviewForm({ ...reviewForm, [name]: Number(value) });
  };

  //TEXTFIELD
  const handleReview = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setReviewForm({ ...reviewForm, [name]: value });
  };

  //ENVIO LOS DATOS
  function handleSubmit(e) {
    e.preventDefault();

    if (reviewForm.review === "") {
      setErrors({
        msg: "Por favor, acompaña tu calificación con un comentario, gracias!",
      });

      setTimeout(() => {
        setErrors({});
      }, 3000);

      return;
    } else {

      dispatch(updateUser(userDetail._id, reviewForm));
     
     
      //ALERT
      Swal.fire({
        position: "top-end ",
        grow: "row",
        icon: "success",
        title: "Gracias por tu opinión y a seguir disfrutando!",
        showConfirmButton: false,
        timer: 1500,
      });

      //LIMPIO LOS ESTADOS LOCALES
      setReviewForm({ initialForm });
    }
  }

  return (
    <Paper elevation={5} sx={{ width: 330 }}>
      <Card
        sx={{
          border: "1px dashed grey",
          m: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <CardMedia
              component="img"
              image={imgp6}
              alt="HM <3"
              sx={{ width: 300 }}
            />
            <form onSubmit={handleSubmit}>
              {/* RATING */}
              <Box
                sx={{
                  p: 2,
                  mb: 1,
                  alignItems: "center",
                }}>
                <Box
                  sx={{
                    p: 2,
                    mb: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}>
                  <Typography component="legend" variant="h5">
                    Que te parece Henry Match?
                  </Typography>
                  <Rating
                    sx={{ m: 2, color: "#ffff00d1" }}
                    name="rating"
                    defaultValue={2}
                    precision={0.5}
                    size="large"
                    value={reviewForm.rating}
                    getLabelText={getLabelText}
                    onChange={handleRating}
                    onChangeActive={(e, newHover) => {
                      setHover(newHover);
                    }}
                    /* icon={} readOnly*/
                    emptyIcon={
                      <StarBorderIcon
                        style={{ opacity: 0.25 }}
                        color="primary"
                        fontSize="inherit"
                      />
                    }
                  />
                  {rating !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : rating]}
                    </Box>
                  )}
                </Box>
                <Divider sx={{ bgcolor: "white" }} />

                {/* REVIEW */}
                <Box
                  sx={{
                    boxShadow: 25,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <Typography
                    component="legend"
                    variant="h6"
                    sx={{
                      m: 3,
                    }}>
                    Agregá un comentario:{" "}
                  </Typography>
                  <TextField
                    type="text"
                    value={reviewForm.review}
                    name="review"
                    id="filled-multiline-static"
                    label="review"
                    multiline
                    rows={4}
                    sx={{ width: 300 }}
                    placeholder="contanos que tal?"
                    /*             defaultValue="Default Value"
                     */ /* variant="standard" */
                    color="primary"
                    onChange={handleReview}
                  />
                  {errors.msg && (
                    <Typography
                      sx={{ size: "small", color: "#dc3107ed" }}
                      color="warning">
                      {errors.msg}
                    </Typography>
                  )}
                  {/*   <Button
                    color="primary"
                    type="button"
                    size="large"
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}>
                  </Button> */}
                  <button className="button">ENVIAR</button>
                </Box>
              </Box>
            </form>
          </Box>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          image={imgp7}
          alt="HM <3"
        />
      </Card>
    </Paper>
  );
};

export default ReviewField;
