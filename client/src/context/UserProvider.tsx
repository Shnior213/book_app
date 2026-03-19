import { useState, useEffect } from "react";
import { UserContext, type UserCtx } from "./UserContext";

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserCtx>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const storedUserId = localStorage.getItem("userId");

        if (token && storedUserId) {
          setUser({ userId: storedUserId, username: null });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
};

export { UserContext };
