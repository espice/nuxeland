"use client";

/* eslint-disable no-unused-vars */
import React, { createContext, useState } from "react";

export interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContext {
  user: UserType | null;
  setUser: (e: UserType) => void;
}

const AuthCtx = createContext<AuthContext>({
  user: null,
  // eslint-disable-next-line
  setUser: (e) => {},
});

const AuthProvider: React.FC<{
  children: React.ReactNode;
  user: UserType | null;
}> = ({ children, user: me }) => {
  const [user, setUser] = useState<UserType | null>(me);

  return (
    // eslint-disable-next-line
    <AuthCtx.Provider value={{ user, setUser }}>{children}</AuthCtx.Provider>
  );
};

export default AuthCtx;
export { AuthProvider };
