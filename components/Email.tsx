import { FunctionComponent } from "preact";
import { Correo } from "../types.ts";


const Email: FunctionComponent<Correo> = (props) => {

  return (
    <div class="mail_completo">
      <p class="parte_mail">
        <b>Destinatario: </b> <br/> <i>{props.destinatario}</i>
      </p>
      
      <p class="parte_mail">
        <b>Asunto: </b> <br/> <span>{props.asunto}</span>
      </p> 

      <p class="parte_mail">
        <b>Mensaje: </b> <br/> <span>{props.mensaje}</span>
      </p>
      <p class="parte_mail">
        <b>Fecha de envío: </b> <br/> <i>{props.fecha_envío}</i>
        </p>
    </div>
  );
};

export default Email;