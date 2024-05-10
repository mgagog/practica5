import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import ClientHeader from "../../components/ClientHeader.tsx";

const Layout = (props: PageProps) => {
  const Component = props.Component;
  return (
    <>
      <ClientHeader />
      <Component />
    </>
  );
};

export default Layout;