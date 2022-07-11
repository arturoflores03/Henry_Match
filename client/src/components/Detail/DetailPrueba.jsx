import React,{ useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearUserDetail, clearUserDetailMatches, getUserByDetail, getUserByNick } from "../../Redux/actions";
import girlImg from "../../assets/mujerIcon.jpg";
import manlImg from "../../assets/hombreIcon.jpg";
import lgbtImg from "../../assets/lgbtIcon.webp";

const DetailPrueba = () => {
    const dispatch = useDispatch();
    const {nickname} = useParams();

useEffect(()=>{
    dispatch(getUserByDetail(nickname));
    return ()=>{
        dispatch(clearUserDetailMatches())
    }
},[dispatch]);

const userDetail=useSelector(state => state.userDetailMatches);
  return (
    <div>
        {
            userDetail?
            <div>
                <img src={userDetail.image} alt={userDetail.name} />  {/*? userDetail.image : userDetail.gender == "female"? girlImg : userDetail.gender == "male"? manlImg: lgbtImg */}
                <hr />
                <h2>Nombre: {userDetail.name+ "."}</h2>
                <h3>Edad: {userDetail.age+ "."}</h3>
                <h3>Genero: {userDetail.gender+ "."}</h3>
                <h3>Genero de Interes: {userDetail.genderInt+ "."}</h3>
                <h3>Descripcion: {userDetail.description?userDetail.description+ ".":"Edita tu perfil para agregar una Descripcion y que los usuarios puedan saber mas de ti.!"}</h3>
                <h3>Intereses: {userDetail.interests?.length > 0 ? userDetail.interests.join(", ")+ "." : "Edita tu perfil para agregar tus Intereses.!"}</h3>
                <hr />
            </div>
            :<div><h4>Loading...</h4></div>
        }

            <Link to="/">
                <button>Back</button>
            </Link>
    </div>
  )
}

export default DetailPrueba