import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { clearUserDetail } from "../../Redux/actions";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth0();

  function handleClearDetail() {
    logout({ returnTo: window.location.origin });
    dispatch(clearUserDetail());
  }

  return (
    <Button
      type="button"
      size="medium"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
<<<<<<< HEAD
      onClick={handleClearDetail}>
=======
      onClick={() => handleClearDetail()}>
>>>>>>> 308c0446f192689b7fe28f5b70dff38ddd7363d3
      CERRAR SESION
    </Button>
  );
};

export default LogoutButton;
