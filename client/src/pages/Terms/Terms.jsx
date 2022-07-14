import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { Tooltip } from "@mui/material";
import { Toolbar } from "@mui/material";
import { AppBar } from "@mui/material";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" sx={{ mt: 10 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="inherit">
          <Toolbar>
            <Tooltip title="inicio">
              <NavLink to="/">
                <IconButton>
                  <LocalFireDepartmentIcon
                    sx={{ color: "#ffff00", fontSize: 50 }}
                  />
                </IconButton>
              </NavLink>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>

      <h1>TERMINOS Y CONDICIONES</h1>
      <br />
      <h3>Su Contrato de servicios ahora es más claro:</h3>
      <p>
        Vamos a actualizar el Contrato de servicios de HENRY MATCH que se aplica
        a los productos y servicios para consumidores online de HENRY MATCH que
        usa. Estamos realizando estas actualizaciones para aportar mayor
        claridad a nuestros términos y asegurarnos de que son transparentes para
        los usuarios, así como para cubrir nuevos productos, servicios y
        características de HENRY MATCH. Las actualizaciones, que se resumen a
        continuación, entrarán en vigor el 15 de agosto de 2022. Si sigue usando
        nuestros productos y servicios a partir del 15 de agosto de 2022, se
        considerará una aceptación del Contrato de servicios de HENRY MATCH
        actualizado.
      </p>
      <br />
      <h3>Preguntas frecuentes:</h3>
      <br />
      <h4>¿Qué es el Contrato de servicios de HENRY MATCH?</h4>
      <p>
        El Contrato de servicios de HENRY MATCH es un contrato entre usted y
        HENRY MATCH (o una de sus filiales) que rige el uso que hace de los
        productos y servicios para consumidores online de HENRY MATCH. Puede ver
        una lista completa de los productos y servicios cubiertos aquí.
      </p>

      <br />
      <h3>
        ¿Cuáles son los productos y servicios que el Contrato de servicios de
        HENRY MATCH no cubre?
      </h3>
      <p>
        El Contrato de servicios de HENRY MATCH no se aplica a los productos y
        servicios específicos de clientes del ámbito empresarial, como HENRY
        MATCH 365 para organizaciones empresariales, educativas y
        gubernamentales, Azure, Yammer o Skype for Business. Para conocer los
        compromisos relativos a la seguridad, la privacidad y el cumplimiento y
        obtener información relacionada con HENRY MATCH 365 para empresas,
        visite el centro de confianza de HENRY MATCH.
      </p>
      <br />
      <h3>
        ¿Qué cambios está haciendo HENRY MATCH al Contrato de servicios de HENRY
        MATCH?
      </h3>
      <p>
        Hemos hecho un resumen de los cambios más importantes aquí. Para ver
        todos los cambios, le recomendamos que lea el Contrato de servicios de
        HENRY MATCH completo.
      </p>

      <br />
      <h3>¿Cuándo entran en vigor estos términos?</h3>
      <p>
        {" "}
        Las actualizaciones del Contrato de servicios de HENRY MATCH entrarán en
        vigor el 15 de agosto de 2022. Hasta entonces, las condiciones actuales
        permanecen en vigor.
      </p>
      <br />
      <h3>¿Cómo acepto estos términos?</h3>
      <p>
        {" "}
        Si sigue usando nuestros productos y servicios o accede a ellos a partir
        del 15 de agosto de 2022, se considerará una aceptación del Contrato de
        servicios de HENRY MATCH actualizado. Si no los acepta, puede optar por
        dejar de usar los productos y servicios y cerrar su cuenta de HENRY
        MATCH antes del 15 de agosto de 2022.
      </p>
      <br />
      <Button onClick={() => navigate(-1, { replace: true })}>ATRÁS</Button>
    </Box>
  );
};
export default Terms;
