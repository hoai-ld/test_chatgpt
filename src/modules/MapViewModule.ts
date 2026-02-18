import Map from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Search from "@arcgis/core/widgets/Search";

const citiesLayerUrl =
  "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Cities_Generalized/FeatureServer/0";

export type CreateMapViewOptions = {
  container: HTMLDivElement;
  enableCitiesLayer: boolean;
};

export type MapViewInstance = {
  map: Map;
  view: MapView;
};

export function createMapView({
  container,
  enableCitiesLayer
}: CreateMapViewOptions): MapViewInstance {
  const map = new Map({
    basemap: "arcgis-topographic"
  });

  if (enableCitiesLayer) {
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
  }

  const view = new MapView({
    map,
    container,
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

  return {
    map,
    view
  };
}

export function destroyMapView(view: MapView | null): void {
  if (!view) return;
  view.destroy();
}
