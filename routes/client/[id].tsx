import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";
import Email from "../../components/Email.tsx";
import { Correo as CorreoProps } from "../../types.ts";


export const handler: Handlers = {
    GET: (req: Request, ctx: FreshContext<unknown, CorreoProps>) => {
        try {
          const id = parseInt(ctx.params.id);
          const cookie = getCookies(req.headers);
          if(!cookie.session || JSON.parse(cookie.session) === 0) {
            return new Response("", {
            status: 303,
            headers: {
              "Location": "/auth",
            },
            });
          }
          if(!cookie.emails || isNaN(id)){
            return new Response("", {
              status: 303,
              headers: {
                "Location": "/client/home",
              },
            });
          }
          else {
            const emails: CorreoProps[] = JSON.parse(cookie.emails);
            const email = emails.at(id)
            if(email === undefined){
              return new Response("", {
                status: 303,
                headers: {
                  "Location": "/client/home",
                },
              });
            }
            return ctx.render({destinatario: email.destinatario, asunto: email.asunto, mensaje: email.mensaje, fecha_envío: email.fecha_envío});
          }
        } catch (error) {
          return new Response(error.message, {
            status: 500,
          });
        }
      },
  };
  
  const Page = (props: PageProps<CorreoProps>) =>{
    const {destinatario, asunto, mensaje, fecha_envío} = props.data
      try {
          return (
          <Email destinatario={destinatario} asunto={asunto} mensaje={mensaje} fecha_envío={fecha_envío}/>
      )
      } catch (error) {
          throw new Error("Ha habido un error");
      }
  }
  
  export default Page;