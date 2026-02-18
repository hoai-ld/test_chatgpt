import { ReactNode, createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { usePart } from "./PartContext";

type LayerPermission = {
  citiesLayer: boolean;
};

type LayerPermissionContextType = {
  permissions: LayerPermission;
};

const LayerPermissionContext =
  createContext<LayerPermissionContextType | undefined>(undefined);

export function LayerPermissionProvider({
  children
}: {
  children: ReactNode;
}) {
  const { isAuthenticated, user } = useAuth();
  const { currentPart } = usePart();

  const value = useMemo<LayerPermissionContextType>(() => {
    const isAdmin = user?.role === "admin";

    return {
      permissions: {
        citiesLayer: isAuthenticated && isAdmin && currentPart !== "analytics"
      }
    };
  }, [currentPart, isAuthenticated, user]);

  return (
    <LayerPermissionContext.Provider value={value}>
      {children}
    </LayerPermissionContext.Provider>
  );
}

export function useLayerPermission() {
  const context = useContext(LayerPermissionContext);
  if (!context) {
    throw new Error(
      "useLayerPermission must be used within a LayerPermissionProvider"
    );
  }
  return context;
}
