import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { AuthProvider } from "./contexts/AuthContext";
import { PartProvider } from "./contexts/PartContext";
import { LayerPermissionProvider } from "./contexts/LayerPermissionContext";
import { MapProvider } from "./contexts/MapContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <PartProvider>
        <LayerPermissionProvider>
          <MapProvider>
            <App />
          </MapProvider>
        </LayerPermissionProvider>
      </PartProvider>
    </AuthProvider>
  </React.StrictMode>
);
