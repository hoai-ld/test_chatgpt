import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Search from "@arcgis/core/widgets/Search";

import "@arcgis/core/assets/esri/themes/light/main.css";

const citiesLayerUrl =
  "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Cities_Generalized/FeatureServer/0";

export default function App() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return undefined;

    const map = new Map({
      basemap: "arcgis-topographic"
    });

    const citiesLayer = new FeatureLayer({
      url: citiesLayerUrl,
      title: "US Cities (Public ArcGIS Layer)",
      outFields: ["*"],
      popupTemplate: {
        title: "{CITY_NAME}",
        content: "<b>State:</b> {STATE_NAME}<br/><b>Population:</b> {POP}"
      }
    });

    map.add(citiesLayer);

    const view = new MapView({
      map,
      container: mapRef.current,
      center: [-98.5795, 39.8283],
      zoom: 4
    });

    const scaleBar = new ScaleBar({
      view,
      unit: "dual"
    });

    const search = new Search({
      view
    });

    view.ui.add(scaleBar, "bottom-left");
    view.ui.add(search, "top-right");

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className="app-wrapper">
      <header>
        <h1>React WebGIS + Esri Free Layers</h1>
        <p>
          Bản demo dùng basemap miễn phí của Esri và layer public từ ArcGIS Online.
        </p>
      </header>
      <div className="map-container" ref={mapRef} />
    </div>
  );
}
