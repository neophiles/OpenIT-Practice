import { Outlet } from "react-router-dom";
import { Grid } from "@chakra-ui/react";
import TopNavbar from "../components/TopNavbar";
import SideNavbar from "../components/SideNavbar";
import Footer from "../components/Footer";

function RootLayout({ handleLogout, currentUser }) {
  return (
    <>
      <TopNavbar handleLogout={handleLogout} currentUser={currentUser} />
      <Grid templateColumns="100px 1fr" alignItems="start" px="30px">
        <SideNavbar />
        <Outlet />
      </Grid>
      <Footer />
    </>
  )
}

export default RootLayout;
