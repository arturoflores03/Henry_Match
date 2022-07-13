//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

//======IMPORTACIONES DE COMPONENTES
import Loader from "../../components/Loader/Loader";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { updateUser } from "../../Redux/actions/index";
//======ESTILO E IMAGENES
import userImgs from "./userImgs";
import "./Subscription.css";
import {
  ImageList,
  ImageListItem,
  Container,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import Swal from "sweetalert2";
import { height } from "@mui/system";

//STRIPE CLAVE PUBLICABLE pk_test_51LHnyuJ7NqOhO9cbrpQWMKYKfkW09dgZGHXXmjGudts20yyqA4vyDxHz3bufSWmUkTHvtGeIfII2LfR1DJpuumId00oxxCoyhE;
const stripePromise = loadStripe(
  "pk_test_51LHnyuJ7NqOhO9cbrpQWMKYKfkW09dgZGHXXmjGudts20yyqA4vyDxHz3bufSWmUkTHvtGeIfII2LfR1DJpuumId00oxxCoyhE"
);

//ESTE COMPONENTE VA DENTRO DE CHECKOUTFORM
const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const userDetail = useSelector((state) => state.userDetail);
  const [isLoading, setIsLoading] = useState(false);

  //IMAGENES DEL BACKGROUND
  const imgs = userImgs;
  //STRIPE
  const stripe = useStripe();
  const elements = useElements();

  //BOTON DE PAGO
  const handleSubmit = async (e) => {
    e.preventDefault();
    //LOADER
    setIsLoading(true);

    //CREO EL METODO DE PAGO
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!paymentMethod) {
      /*OBJETO PAYMENT => { id:"pm_1LJJZyJ7NqOhO9cbX9VPleXL",
created: 1657295934, type: "card" } */
      setIsLoading(false);
      //ALERT
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Los datos ingresados NO son correctos",
        showConfirmButton: false,
        timer: 2800,
      });
      elements.getElement(CardElement).clear();
    }
    //SI NO HAY ERROR, USO EL SERVIDOR PARA HACER LA SOLICITUD Y EN DATA ESTARA LA RESPUESTA DEL SERVIDOR
    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios
          //http://localhost:9000 ===> https://henrymatch-pg.herokuapp.com,
          .post("http://localhost:9000/subscription", {
            id,
            amount: 20000,
          });
        //MENSAJE DEL SERVIDOR
        const response = data?.message;
        /* console.log(userDetail, 'USERDETAIL') */
        if (response === "ok") {
          dispatch(updateUser(userDetail._id, { premium: true }));
       /*    axios.post(`https://henrymatch-pg.herokuapp.com/send-mail-premium`, { name, email }) */
        }

        setIsLoading(false);
        //ALERT
        Swal.fire({
          position: "center",
          icon: response === "ok" ? "success" : "error",
          title:
            response === "ok" ? "Operación realizada con éxito!" : response,
          showConfirmButton: false,
          timer: 2800,
        });
        elements.getElement(CardElement).clear();
        navigate("/home", { replace: true });
      } catch (e) {
        setIsLoading(false);
        //ALERT
        Swal.fire({
          position: "center",
          icon: "error",
          title: e.message,
          showConfirmButton: false,
          timer: 2800,
        });
        elements.getElement(CardElement).clear();
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      <ImageList
        gap={8}
        sx={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(100px, 135px))!important",
          width: "100%",
          height: "100%",
        }}
        cols={6}
        rowHeight={70}>
        {imgs.map((item) => (
          <ImageListItem
            key={item.title}
            cols={item.cols || 1}
            rows={item.rows || 1}
            sx={{ height: "100% !important" }}>
            <img
              className="checkout-img"
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      {/* DUPLICADA PORQUE ME QUIERO IR A HACER OTRA COSA */}
      <ImageList
        gap={8}
        sx={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(100px, 135px))!important",
          width: "100%",
          height: "100%",
        }}
        cols={6}
        rowHeight={70}>
        {imgs.map((item) => (
          <ImageListItem
            key={item.title}
            cols={item.cols || 1}
            rows={item.rows || 1}
            sx={{ height: "100% !important" }}>
            <img
              className="checkout-img"
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      {/*CARD AMARILLA*/}
      <Box>
        <div className="checkoutform-div">
          <h4>
            Ya somos {Object.keys(users).length} integrantes de esta linda
            comunidad!
          </h4>
          <h2>SUSCRIPCION MENSUAL</h2>
          <p>US$ 200</p>
          <form className="checkoutform" onSubmit={(e) => handleSubmit(e)}>
            <p>Ingresá tus credenciales {userDetail.name}</p>
            {/*INPUT DE STRIPE */}
            <CardElement className="checkoutform-input" />
            <p>
              Te enviaremos un correo a {userDetail.email} cuando el pago se
              efectue.
            </p>
            <NavLink className="link" to="/profile">
              <small>Quiero modificar mi correo</small>
            </NavLink>
            <div>
              <button className="button" disabled={!stripe}>
                SUSCRIBIRME
              </button>
            </div>
          </form>
          <NavLink className="link" to="/home">
            <h3>
              volver a <span>HOME</span>
            </h3>
          </NavLink>
        </div>
      </Box>
    </Box>
  );
};

//ESTE COMPONENTE ES EL QUE SE EXPORTA.
const Subscription = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(#060606f3, #060606a2 )",
        width: "100%",
        height: "100%",
      }}>
      <Elements stripe={stripePromise}>
        <Form />
      </Elements>
    </Box>
  );
};

export default Subscription;
