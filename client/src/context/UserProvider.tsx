import { useState } from "react";
import { UserContext, type UserCtx } from "./UserContext";

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserCtx>();

  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
};

export { UserContext };
