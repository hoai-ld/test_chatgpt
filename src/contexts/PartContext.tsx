import { ReactNode, createContext, useContext, useMemo, useState } from "react";

export type AppPart = "overview" | "operations" | "analytics";

type PartContextType = {
  currentPart: AppPart;
  setCurrentPart: (part: AppPart) => void;
};

const PartContext = createContext<PartContextType | undefined>(undefined);

export function PartProvider({ children }: { children: ReactNode }) {
  const [currentPart, setCurrentPart] = useState<AppPart>("overview");

  const value = useMemo(
    () => ({
      currentPart,
      setCurrentPart
    }),
    [currentPart]
  );

  return <PartContext.Provider value={value}>{children}</PartContext.Provider>;
}

export function usePart() {
  const context = useContext(PartContext);
  if (!context) {
    throw new Error("usePart must be used within a PartProvider");
  }
  return context;
}
