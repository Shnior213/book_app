import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
