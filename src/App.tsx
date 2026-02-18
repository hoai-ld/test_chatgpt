import { useEffect, useRef } from "react";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./contexts/AuthContext";
import { useLayerPermission } from "./contexts/LayerPermissionContext";
import { useMapContext } from "./contexts/MapContext";
import PartSelector from "./components/PartSelector";

import "@arcgis/core/assets/esri/themes/light/main.css";

export default function App() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { permissions } = useLayerPermission();
  const { initializeMapView, clearMapView } = useMapContext();

  useEffect(() => {
    if (!isAuthenticated || !mapRef.current) return undefined;

    initializeMapView({
      container: mapRef.current,
      enableCitiesLayer: permissions.citiesLayer
    });

    return () => {
      clearMapView();
    };
  }, [clearMapView, initializeMapView, isAuthenticated, permissions.citiesLayer]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="app-wrapper">
      <header>
        <div>
          <h1>React WebGIS + Esri Free Layers</h1>
          <p>Xin chào {user?.username}. Bạn đang dùng tài khoản admin cứng.</p>
        </div>
        <div className="header-actions">
          <PartSelector />
          <button type="button" onClick={logout}>
            Đăng xuất
          </button>
        </div>
      </header>
      {!permissions.citiesLayer && (
        <div className="warning-banner">
          Layer thành phố đang bị tắt theo rule của LayerPermissionContext (part
          analytics).
        </div>
      )}
      <div className="map-container" ref={mapRef} />
    </div>
  );
}
