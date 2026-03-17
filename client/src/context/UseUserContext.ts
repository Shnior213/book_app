import { use } from "react";
import { UserContext } from "./UserProvider";

export const useUserContext = () => {
  const context = use(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used in a postProvider");
  }

  return context;
};
