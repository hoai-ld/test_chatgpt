import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from "react";
import {
  createMapView,
  destroyMapView,
  type CreateMapViewOptions
} from "../modules/MapViewModule";

type MapContextType = {
  map: Map | null;
  view: MapView | null;
  initializeMapView: (options: CreateMapViewOptions) => MapView;
  clearMapView: () => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<Map | null>(null);
  const [view, setView] = useState<MapView | null>(null);
  const mapRef = useRef<Map | null>(null);
  const viewRef = useRef<MapView | null>(null);

  const clearMapView = useCallback(() => {
    destroyMapView(viewRef.current);
    viewRef.current = null;
    mapRef.current = null;
    setView(null);
    setMap(null);
  }, []);

  const initializeMapView = useCallback(
    (options: CreateMapViewOptions) => {
      clearMapView();
      const instance = createMapView(options);
      mapRef.current = instance.map;
      viewRef.current = instance.view;
      setMap(instance.map);
      setView(instance.view);
      return instance.view;
    },
    [clearMapView]
  );

  const value = useMemo<MapContextType>(
    () => ({
      map,
      view,
      initializeMapView,
      clearMapView
    }),
    [map, view, initializeMapView, clearMapView]
  );

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
}
