import { ReactNode, createContext, useContext, useMemo, useState } from "react";

type User = {
  username: string;
  role: "admin";
};

type LoginPayload = {
  username: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const HARDCODED_ACCOUNT: LoginPayload = {
  username: "admin",
  password: "admin"
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      login: ({ username, password }) => {
        const isValid =
          username === HARDCODED_ACCOUNT.username &&
          password === HARDCODED_ACCOUNT.password;

        if (isValid) {
          setUser({
            username,
            role: "admin"
          });
        }

        return isValid;
      },
      logout: () => setUser(null)
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
