//======ESTILO E IMAGENES
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

const Loader = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Loader;
