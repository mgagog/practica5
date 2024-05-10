import AuthForm, { ErrorProps } from "../components/AuthForm.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";


export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext) =>{
    const cookie = getCookies(req.headers);
    if(cookie.session){
      const session = JSON.parse(cookie.session);
      if(session === 1) {
          return new Response("", {
          status: 303,
          headers: {
            "Location": "/client/home",
          },
        });
      }
    }
    return ctx.render({emailError: false, contraseñaError: false, vacioError: false});
  },
  
  POST: async (req: Request, ctx: FreshContext<unknown, ErrorProps>) => {
    try {
      const formatoEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/;
      const form = await req.formData();
      const data = {
        email: form.get("email"),
        contraseña: form.get("contraseña")
      };
      if(!data.email || !data.contraseña){
        return ctx.render({emailError: false, contraseñaError: false, vacioError: true});
      }
      if(!formatoEmail.test(data.email?.toString())) {
        return ctx.render({emailError: true, contraseñaError: false, vacioError: false});
      }
      if(data.contraseña.toString().length < 7){
        return ctx.render({emailError: false, contraseñaError: true, vacioError: false});
      }

      return new Response("", {
        status: 303,
        headers: {
          "Location": "/client/home",
          "Set-Cookie": "session=1; path=/"
        },
      });
      


      } catch (error) {
        return new Response(error.message, {
          status: 500,
        });
      }
    },
  };
 
  const Page = (props: PageProps<ErrorProps>) =>{
    const { emailError, contraseñaError, vacioError} = props.data;
      try {
          return (
              <AuthForm emailError={emailError} contraseñaError={contraseñaError} vacioError={vacioError}/>
      )
      } catch (error) {
          throw new Error(error);
      }
  }
  
  export default Page;