import styled from "styled-components";
import { StyledNavLink } from "../styles/StyledNavLink";
import { useUserContext } from "../context/useUserContext";
import { logout } from "../api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const Header = styled.header`
  max-width: 100vw;
  overflow-x: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100px;
  background-color: hsl(206.6, 87%, 93.9%);
  border-radius: 3px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Li = styled.li`
  list-style-type: none;
  font-size: 1.5rem;
  width: 120px;
  margin: 10px;
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const H1 = styled.h1`
  /* font-size: 1.5rem; */
  height: 50px;
  display: flex;
  align-items: center;
  margin: 0;
`;

const LogoutButton = styled.button`
  height: 40px;
  width: 100px;
  cursor: pointer;
  margin: 0;
  color: hsl(211, 100%, 50%);
  font-size: 1.5rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  border-radius: 8px;

  &:hover {
    color: black;
  }
`;

const NavBar = () => {
  const { user, setUser } = useUserContext();
  const nav = useNavigate();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      nav("/", { replace: true });
      setUser(undefined);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
    },
    onError: (err) => {
      console.error("logout failed", err);
    },
  });

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <Header>
      <StyledNavLink to={"/"}>
        <H1>Home Page</H1>
      </StyledNavLink>

      {user ? (
        <Ul>
          <Li>
            <StyledNavLink to={"/mybooks"}>Books I Read</StyledNavLink>
          </Li>
          <Li>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </Li>
        </Ul>
      ) : (
        <Ul>
          <Li>
            <StyledNavLink to={"/register"}>Register</StyledNavLink>
          </Li>
          <Li>
            <StyledNavLink to={"/login"}>Login</StyledNavLink>
          </Li>
        </Ul>
      )}
    </Header>
  );
};

export default NavBar;
