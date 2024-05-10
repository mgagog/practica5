import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Cookie, getCookies, setCookie } from "https://deno.land/std@0.224.0/http/cookie.ts";
import NewEmail, { ErrorProps } from "../../components/NewEmail.tsx";
import { Correo } from "../../types.ts"

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext) => {
    try {
      const cookie = getCookies(req.headers);
        const session = JSON.parse(cookie.session);
        if(!session || session === 0) {
            return new Response("", {
            status: 303,
            headers: {
              "Location": "/auth",
            },
          });
        }
        return ctx.render({destinatarioError: false, asuntoError: false, mensajeError: false});
    } catch (error) {
      return new Response(error.message, {
        status: 500,
      });
    }
  },

  POST: async (req: Request, ctx: FreshContext<unknown, ErrorProps>) => {
    try {
      const formatoEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/;
      const form = await req.formData();
      const data = {
        destinatario: form.get("destinatario"),
        asunto: form.get("asunto"),
        mensaje: form.get("mensaje")
      };
      if(!data.destinatario || !formatoEmail.test(data.destinatario.toString())){
        return ctx.render({destinatarioError: true, asuntoError: false, mensajeError: false});
      }
      if(!data.asunto || data.asunto.toString().split(" ").length < 5) {
        return ctx.render({destinatarioError: false, asuntoError: true, mensajeError: false});
      }
      if(!data.mensaje){
        return ctx.render({destinatarioError: false, asuntoError: false, mensajeError:true});
      }
      const now = new Date();
      const fechaString = now.getDate().toString() + "/" + now.getMonth().toString() + "/" + now.getFullYear().toString() + " " + now.getHours().toString() + ":" + now.getMinutes().toString();
      const email: Correo = {
        asunto: data.asunto.toString(),
        mensaje: data.mensaje.toString(),
        destinatario: data.destinatario.toString(),
        fecha_envío: fechaString
      }
      const cookie = getCookies(req.headers);
      if(!cookie.emails){
        const emails: Correo[]= [];
        emails.push(email);
        return new Response("", {
          status: 303,
          headers: {
            "Location": "/client/home",
            "Set-Cookie": `emails=${JSON.stringify(emails)}; path=/`
          },
        });
      }
      else{
        const emails: Correo[] = JSON.parse(cookie.emails);
        emails.push(email);
        return new Response("", {
        status: 303,
        headers: {
          "Location": "/client/home",
          "Set-Cookie": `emails=${JSON.stringify(emails)}; path=/`
        },
      });}

      } catch (error) {
        return new Response(error.message, {
          status: 500,
        });
      }
    },
  };
  
  const Page = (props: PageProps<ErrorProps>) =>{
    const {destinatarioError, asuntoError, mensajeError} = props.data;
      try {
          return (
          <div>
            <NewEmail destinatarioError={destinatarioError} asuntoError={asuntoError} mensajeError={mensajeError}/>
          </div>
      )
      } catch (error) {
          throw new Error(error);
      }
  }
  
  export default Page;