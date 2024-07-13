import { Container } from "@radix-ui/themes";
import { Outlet, useParams } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  const params = useParams();

  if (params?.geoImage === "geo") {
    return (
      <main className=" p-2 mb-5 ">
        <Outlet className="" />
      </main>
    );
  } else
    return (
      <>
        <main className=" p-2 mb-5 ">
          <Container className="app--container">
            <NavBar />
            <Outlet className="" />
          </Container>
        </main>
      </>
    );
};

export default Layout;
