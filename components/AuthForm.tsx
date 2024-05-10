import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { JSX } from "preact";

export type ErrorProps = {
  emailError: boolean;
  contraseñaError: boolean;
  vacioError: boolean;
};


const Form: FunctionComponent<ErrorProps> = (props) => {
    return (
        <form method="POST" class="auth">
          <img src={'/logo.png'} class="logo"/>
          <div class="inputs_auth">
            <input type="email" placeholder="Email" name="email"/>
            <input type="password" placeholder="Contraseña" name="contraseña"/>
          </div>
          {props.emailError && <i class="error">El formato de mail no es el correcto</i>}
          {props.contraseñaError && <i class="error">La contraseña debe tener más de 6 caracteres</i>}
          {props.vacioError && <i class="error">No se deben dejar campos sin rellenar</i>}
          <button type="submit" class="blue_button">Confirmar</button>
        </form>
    );
  };
  
  export default Form;