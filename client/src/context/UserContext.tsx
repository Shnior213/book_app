import { createContext, type Dispatch, type SetStateAction } from "react";

export type UserCtx = { userId: string; username: string | null };

export const UserContext = createContext<
  | {
      user: UserCtx | undefined;
      setUser: Dispatch<SetStateAction<UserCtx | undefined>>;
    }
  | undefined
>(undefined);
