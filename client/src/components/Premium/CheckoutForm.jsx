//======PAQUETES Y LIBRERIAS

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
//======IMPORTACIONES DE COMPONENTES

//======IMPORTACIONES DE FUNCIONES NUESTRAS
//======ESTILO E IMAGENES
import userImgs from "./userImgs";
import "./CheckoutForm.css";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Container,
  autocompleteClasses,
} from "@mui/material";

import Swal from "sweetalert2";

/*
NUMERO TARJETA DE PRUEBA 
4242 4242 4242 4242 
4000056655665556
5555555555554444
fecha futura: 12/34
cualquier CVC de tres dígitos (cuatro dígitos si usas una tarjeta American Express)
cualquier valor para los demás campos del formulario.
*/

//STRIPE CLAVE PUBLICABLE pk_test_51LHnyuJ7NqOhO9cbrpQWMKYKfkW09dgZGHXXmjGudts20yyqA4vyDxHz3bufSWmUkTHvtGeIfII2LfR1DJpuumId00oxxCoyhE;
const stripePromise = loadStripe(
  "pk_test_51LHnyuJ7NqOhO9cbrpQWMKYKfkW09dgZGHXXmjGudts20yyqA4vyDxHz3bufSWmUkTHvtGeIfII2LfR1DJpuumId00oxxCoyhE"
);

//ESTE COMPONENTE VA DENTRO DE CHECKOUTFORM
const Form = () => {
  const users = useSelector((state) => state.users);
  const userDetail = useSelector((state) => state.userDetail);
  //DATOS QUE ENVIAREMOS EN EL POST
  // const userEmail = userDetail.email;
  //const userId = userDetail._id;
  //IMAGENES DEL BACKGROUND
  const imgs = userImgs;
  //STRIPE
  const stripe = useStripe();
  const elements = useElements();

  //BOTON DE PAGO
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log("aaaaaaaaaaaa", paymentMethod);
    if (!error) {
      console.log(paymentMethod);
    }
  };

  return (
    <Container
      sx={{
        px: 2,
        py: 2,
        background: "linear-gradient(#060606f3, #060606a2 )",
      }}
      maxWidth={"xl"}>
      <ImageList
        //1194
        //928
        //635
        //429
        gap={8}
        sx={{
          /*  px: 7, */
          gridTemplateColumns:
            "repeat(auto-fill, minmax(100px, 135px))!important",
        }}
        cols={6}
        rowHeight={70}>
        {imgs.map((item) => (
          <ImageListItem
            key={item.img}
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
      <div className="checkoutform-div">
        <h4>
          Ya somos {Object.keys(users).length} integrantes de esta linda
          comunidad!
        </h4>
        <h2>SUSCRIPCION MENSUAL</h2>
        <p>US$ 200</p>
        <form className="checkoutform" onSubmit={handleSubmit}>
          <p>Ingresá tus credenciales {userDetail.name}</p>
          <CardElement className="checkoutform-input" />
          <p>
            Te enviaremos un correo a {userDetail.email} cuando el pago se
            efectue.
          </p>
          <NavLink className="link" to="/profile">
            <small>Quiero modificar mi correo</small>
          </NavLink>
          <div>
            {/*             <Button sx={{ p: 1, m: 1 }}>SUSCRIBIRME</Button>
             */}{" "}
            <button>SUSCRIBIRME</button>
          </div>
        </form>
        <h3>
          volver a{" "}
          <NavLink className="link" to="/">
            <span>HOME</span>
          </NavLink>
        </h3>
      </div>
    </Container>
  );
};

//ESTE COMPONENTE ES EL QUE SE EXPORTA.
const CheckoutForm = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <Form />
      </Elements>
    </>
  );
};

export default CheckoutForm;
