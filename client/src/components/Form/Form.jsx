import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { /* updateImg, */ updateUser } from "../../Redux/actions";
import { useRef } from "react";
import "./Form.css";

//Formik identifica todos los inputs con ese NAME
// renderer prop: renderizamos el formulario dentro de una funcion y por ahi le vamos a pasar props(valores) de Formik
// Como es una funcion le puedo poner props e ingreso poniendo props.handleSubmit o sino {}

const interests = ["moda", "artes marciales", "fiestas", "videojuegos", "deportes", "cine", "viajes", "lectura", "programar"]

const Formu = ({ setUpdate, setUpdateForm }) => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const [image, setImage] = useState("");
  const [input, setInput] = useState({
    name: "",
    age: "",
    gender: "",
    genderInt: "",
    henryLevel: "",
    description: "",
    interests: []
  });

  const fileInput = useRef();

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "yqu5aezb");
    await axios
      .post("https://api.cloudinary.com/v1_1/henrymatch/image/upload", formData)
      .then((res) => {
        const urlImage = res.data.url;
        dispatch(updateUser(userDetail._id, { image: urlImage }));
        setUpdate(true);
        /* setUpdateForm(false) */
        alert("Imagen cargada con exito");
      });
    fileInput.current.value = null;
  };

  const closeForm = () => {
    setUpdateForm(false);
  };

  function handleOnChange(e) {
    setInput(e.target.value);
    /*  setInput(
       {
         ...input,
         [e.target.name]: e.target.value
       }); */
  }

  /*   function handleOnChangeAge(e) {
      setInput(
        {
          ...input,
          [e.target.name]: Number(e.target.value)
        });
    } */

  function handleSelect(e) {
    e.preventDefault();
    setInput({
      ...input,
      interests: [...new Set([...input.interests, e.target.value])],
    });

  }

  function handleDeleteInterests(e) {
    e.preventDefault();
    setInput({
      ...input,
      interests: [...input.interests.filter((i) => i !== e.target.value)],
    });
  }

  function handleSendInterests(e) {
    e.preventDefault();
    dispatch(updateUser(userDetail._id, { [e.target.name]: input.interests }))
    setUpdate(true);
    alert("Datos actualizados con exito");
    setInput({
      interests: []
    })

  }

  function handleSend(e) {
    e.preventDefault();
    dispatch(updateUser(userDetail._id, { [e.target.name]: input }));
    /* dispatch(updateUser(userDetail._id,  [e.target.name]: input)); */
    setUpdate(true);
    alert("Datos actualizados con exito");
    setInput({
      name: "",
      age: "",
      description: "",
      interests: []
    })

  }

  return (
    <>
      <div>
        <div>
          <button onClick={closeForm}>X</button>
          <input
            className="selectAr"
            type="file"
            ref={fileInput}
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
          <button className="cargar" onClick={uploadImage}>
            Modificar Imagen
          </button>
        </div>
      </div>
      <form>

        <label  > Tu nombre: </label>

        <input onChange={handleOnChange} type="text" value={input.name} name="name" placeholder="Escribe tu nombre" />
        <button name="name" onClick={(e) => handleSend(e)}> Modificar </button>
      </form>

      <form>

        <label > Tu edad: </label>

        <input onChange={handleOnChange} value={input.age} type="text" name="age" placeholder="Escribe tu edad" />
        <button name="age" onClick={handleSend}> Modificar </button>
      </form>

      <form>

        <label > Tu email: </label>

        <input onChange={handleOnChange} type="text" value={input.name} name="email" placeholder="Escribe tu email" />
        <button name="email" onClick={(e) => handleSend(e)}> Modificar </button>
      </form>

      <form>

        <label > Tu genero: </label>
        <select onChange={handleOnChange} value={input.gender} name="gender">
          <option>Seleccionar</option>
          <option value={'male'}>Hombre</option>
          <option value={'female'}>Mujer</option>
        </select>
        <button name="gender" onClick={handleSend}> Modificar </button>
      </form>


      <div>
        <label> Busco encontrarme con: </label>

        <select onChange={handleOnChange} type="text" value={input.genderInt} name="genderInt">
          <option disabled>Seleccionar</option>
          <option value="male">Hombre</option>
          <option value="female">Mujeres</option>
          <option value="both">Hombres o Mujeres</option>
        </select>
        <button name="genderInt" onClick={handleSend}> Modificar </button>
      </div>

      <div>
        <label> Intereses: </label>

        <select onChange={handleSelect} type="text" value={input.interests} name="interests">

          <option key={"i"} value={""} disabled >Ingresa tu interes</option>

          {
            interests.map((i) => {
              return (<option key={i} value={i} >{i}</option>)
            })
          }

        </select>

        <button name="interests" onClick={handleSendInterests}> Modificar </button>
      </div>

      <div /* className="formsubtitle" */>
        <p> HAS ELEGIDO:</p>
        <ul>
          {input.interests &&
            input.interests.map((i) => (
              <div key={i} className="typeselected">
                <p>{i}</p>
                <button
                  className="delbutton"
                  value={i}
                  onClick={handleDeleteInterests}
                >
                  x
                </button>
              </div>
            ))}
        </ul>
      </div>

      <div>
        <label> Mi etapa en el Bootcamp de Henry </label>

        <select onChange={handleOnChange} value={input.henryLevel} type="text" name="henryLevel">
          <option>Seleccionar</option>
          <option value="m1">M1</option>
          <option value="m2">M2</option>
          <option value="m3">M3</option>
          <option value="m4">M4</option>
          <option value="m5">M5</option>
          <option value="m6">M6</option>
          <option value="pi">PI</option>
          <option value="pf">PF</option>
          <option value="graduate">Graduado</option>
        </select>
        <button name="henryLevel" onClick={handleSend}> Modificar </button>
      </div>

      <form>


        <label > Sobre mi: </label>

        <textarea onChange={handleOnChange} type="text" value={input.description} name="description" />
        <button name="description" onClick={handleSend}> Modificar </button>
      </form>
    </>
  );
};

export default Formu;
