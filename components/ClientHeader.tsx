import { FunctionComponent } from "preact";
import Logout from "../islands/Logout.tsx";

const Menu: FunctionComponent = () => {
  return (
    <div class="client_header">
        <a href="/client/home" class="nebrija">
            <img src="/nebrija.jpg"/>
        </a>
        &emsp;
        <Logout />
    </div>
  );
};

export default Menu;