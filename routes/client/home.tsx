import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";
import Home, {MailBoxProps} from "../../components/Home.tsx";
import { Correo } from "../../types.ts";


export const handler: Handlers = {
    GET: (req: Request, ctx: FreshContext<unknown, MailBoxProps>) => {
        try {
          const cookie = getCookies(req.headers);
          if(!cookie.session || JSON.parse(cookie.session) === 0) {
              return new Response("", {
              status: 303,
              headers: {
                "Location": "/auth",
              },
            });
          }
          if(!cookie.emails){
            return ctx.render({emails: []})
          }
          else{
            const emails: Correo[] = JSON.parse(cookie.emails);
            return ctx.render({emails: emails});
          }
        } catch (error) {
          return new Response(error.message, {
            status: 500,
          });
        }
      },
  };
  
  const Page = (props: PageProps<MailBoxProps>) =>{
      try {
          return (
          <Home emails={props.data.emails}/>
      )
      } catch (error) {
          throw new Error("Ha habido un error");
      }
  }
  
  export default Page;