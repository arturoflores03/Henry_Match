import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      type="button"
      size="medium"
      variant="contained"
      color="secondary"
      startIcon={<LogoutIcon />}
      sx={{ mt: 3, mb: 2 }}
      onClick={() => logout({ returnTo: window.location.origin })}>
      LOGOUT
    </Button>
  );
};

export default LogoutButton;
