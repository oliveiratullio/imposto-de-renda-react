import { createContext, useState } from "react";

export type AuthContextType = {
  auth: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  } | null;
  login: (authData: { token: string; user: { id: string; name: string; email: string } }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const persistedAuth = localStorage.getItem("auth");
  const authData = persistedAuth ? JSON.parse(persistedAuth) : null;
  const [auth, setAuth] = useState<AuthContextType["auth"]>(authData);

  function login(authData: AuthContextType["auth"] | null): void {
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  }
  function logout(): void {
    setAuth(null);
    localStorage.removeItem("auth");
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthContext;