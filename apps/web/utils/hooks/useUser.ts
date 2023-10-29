import { useContext } from "react";
import AuthCtx, { UserType } from "../context/AuthCtx";

export function useUser(): UserType | null {
  const user = useContext(AuthCtx);

  return user.user;
}
