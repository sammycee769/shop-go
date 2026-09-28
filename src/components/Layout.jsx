import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";

const NO_NAV_ROUTES = ["/login", "/register"  ];

export default function Layout() {
  const { pathname } = useLocation();
  const showNav = !NO_NAV_ROUTES.includes(pathname);

  return (
    <>
      {showNav && <Navbar />}
      <Outlet />
    </>
  );
}
