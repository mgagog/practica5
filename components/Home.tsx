import { FunctionComponent } from "preact";
import { Correo } from "../types.ts";

export type MailBoxProps = {
  emails: Correo[];
}

const Home: FunctionComponent<MailBoxProps> = (props) => {

  return (
    <div class="home">
      <a href="/client/new"><button class="blue_button">New email</button></a>
      <div class="mailbox">
        {props.emails.length === 0 && <strong class="no_mail">No has enviado ningún mail</strong>}
        <div class="mail_list">
          {props.emails.map((email, index) => {
            return (
            <a class="mail_simple" key={index} href={`/client/${index}`}>
              <button class="mail_simple_button">
                <p><b class="titulo">Destinatario: </b> <i>{email.destinatario}</i></p>
                <p><b class="titulo">Asunto: </b> <span>{email.asunto}</span></p>
                <p class="mensaje">{email.mensaje}</p>
              </button>
            </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;