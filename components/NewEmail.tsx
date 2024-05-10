import { FunctionComponent } from "preact";

export type ErrorProps = {
    destinatarioError: boolean;
    asuntoError: boolean;
    mensajeError: boolean;
  };

const NewEmail: FunctionComponent<ErrorProps> = (props) => {

  return (
    <div>
        <form method="POST" class="new_mail_form">
            <input placeholder="Destinatario" name="destinatario" class="input_pequeño"></input>
            {props.destinatarioError && <i class="error">El formato de mail no es el correcto</i>}
            <input placeholder="Asunto" name="asunto" class="input_pequeño"></input>
            {props.asuntoError && <i class="error">El asunto del mail debe tener mínimo 5 palabras</i>}
            <textarea placeholder="Mensaje" name="mensaje" class="input_grande"></textarea>
            {props.mensajeError && <i class="error">El mensaje del mail no puede estar vacío</i>}
            <button type="submit" class="blue_button">Enviar</button>
        </form>
    </div>
  );
};

export default NewEmail;