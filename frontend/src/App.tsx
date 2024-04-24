import { Outlet } from "@tanstack/react-router";
import Header from "./components/Header";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import styles from "./assets/global.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className={"py-3 " + styles.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}

export default App;
