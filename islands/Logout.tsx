import { FunctionComponent } from "preact";

const Logout: FunctionComponent = () => {
  return (
        <a href="/auth" onClick={(e) =>{
              document.cookie = "emails=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
              document.cookie = "session=0; path=/"
        }}>
            <button class="cerrar_sesión">Cerrar Sesión</button>
        </a>
  );
};

export default Logout;