import { Container } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
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
