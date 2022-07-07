//======PAQUETES Y LIBRERIAS
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import {
  createUser,
  getUserByNick,
  filterByGender,
  filterByMe,
  getUsers,
} from "../../Redux/actions/index";

//======ESTILO E IMAGENES
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import Swal from "sweetalert2";

//FORMULARIO INICIAL
const initialForm = {
  name: "", //*
  age: "",
  nickname: "", //*
  email: "", //REQUERIDO EN DB//*
  image: "", //REQUERIDO EN DB//*
  description: "",
  gender: "male",
  genderInt: "both",
  password: null,
  likeGiven: [],
  likeRecieved: [],
};

const Modal = ({ modal, setModal, setKey }) => {
  //ESTOS ESTADOS VIENEN DE MUI Y SE PASAN COMO PROPS A Dialog.
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  //ESTO ES NUESTRO
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState(initialForm);
  const users = useSelector((state) => state.users);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUserForm({
      ...userForm,
      name: user?.name,
      nickname: user?.sub,
      email: user?.email, //REQUERIDO EN DB
      image: user?.picture,
    });
  }, [user]);

  //PARA CERRAR MODAL
  const handleClose = () => {
    setModal(false);
  };

  //OBTENGO NOMBRE USUARIO PARA CREAR EL USUARIO
  function handleChangeName(e) {
    e.preventDefault();
    const { name, value } = e.target;
    /* VALIDACIÓN PARA QUE EL NOMBRE SEA UNICO    
    const nameInDb = users.find((u) => u.name === value);
    if (nameInDb) {
      setErrors({ ...errors, name: "tu nombre debe ser único, como vos" });
    } else {
      setUserForm({
        ...userForm,
        [name]: value,
      });
      delete errors.name;
    } */
    setUserForm({
      ...userForm,
      [name]: value,
    });
  }
  //OBTENGO  LA EDAD DEL USUARIO
  function handleChangeAge(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (value < 18) {
      setErrors({ ...errors, age: "Tenes que ser mayor de edad" });
    } else {
      setUserForm({
        ...userForm,
        [name]: Number(value),
      });
      delete errors.age;
    }
  }
  //OBTENGO LOS DEMAS DATOS DEL USUARIO PARA CREAR EL USUARIO
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  }

  //CREO UN USUARIO NUEVO
  function handleSubmit(e) {
    e.preventDefault();

    const { gender, genderInt, name, age } = userForm;
    if ([gender, genderInt, name, age].includes("")) {
      setErrors({ ...errors, msg: "todos los campos son requeridos" });
      setTimeout(() => {
        setErrors(
          /*  VALIDACION PARA QUE EL NOMBRE SEA UNICO
            errors.name
            ? { name: "tu nombre debe ser único, como vos" }
            : */ errors.age ? { age: "Tenes que ser mayor de edad" } : {}
        );
      }, 2000);
      return;
    }
    if (Object.keys(errors).length === 0) {
      dispatch(createUser(userForm));
      dispatch(getUsers());
      dispatch(filterByMe());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Happy Matching!!",
        showConfirmButton: false,
        timer: 2500,
      });
      //SETEO EL FORMULARIO AL ESTADO ORIGINAL
      setUserForm(initialForm);
      setKey(true);
      //CIERRO MODAL
      handleClose();
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth} //ESTADO DEFINIDO ARRIBA
        maxWidth={maxWidth} //ESTADO DEFINIDO ARRIBA
        open={modal}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}>
        <DialogTitle>HENRY MATCH - CREAR USUARIO</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Contá más sobre vos a la comunidad Henry
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            {/* EL NOMBRE DEL USUARIO */}
            <div>
              <InputLabel htmlFor="name">tu nombre:</InputLabel>
              <input
                type="text"
                name="name"
                placeholder="nombre..."
                onChange={handleChangeName}></input>
              {/*VALIDACIÓN PARA QUE EL NOMBRE SEA UNICO
               {errors.name && <p>{errors.name}</p>} */}
            </div>

            {/* LA FECHA DE NACIMIENTO DEL USUARIO */}
            <div>
              <InputLabel htmlFor="age">tu edad:</InputLabel>
              <input
                type="number"
                name="age"
                onChange={handleChangeAge}></input>
              {errors.age && <p>{errors.age}</p>}
            </div>

            {/* EL GENERO DEL USUARIO */}
            <div>
              <InputLabel htmlFor="gender">eres (género):</InputLabel>
              <select name="gender" onChange={handleChange} required>
                <option value="male">hombre</option>
                <option value="female">mujer</option>
              </select>
            </div>

            {/* EL GENERO QUE LE INTERESA VER AL USUARIO */}
            <div>
              <InputLabel htmlFor="genderInt">
                y te interesa encontrar:
              </InputLabel>
              <select name="genderInt" onChange={handleChange} required>
                <option value="both">ambos</option>
                <option value="male">hombres</option>
                <option value="female">mujeres</option>
              </select>
            </div>
            {errors.msg && <p>{errors.msg}</p>}

            <DialogActions>
              <button type="submit">LISTO, QUE TE DIVIERTAS!</button>
            </DialogActions>
          </form>
          <p>En tu perfil podras agregar fotos y más información sobre vos</p>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Modal;
