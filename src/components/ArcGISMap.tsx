import { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import esriConfig from '@arcgis/core/config';
import { MapExample } from './examples';
import '@arcgis/core/assets/esri/themes/light/main.css';

esriConfig.assetsPath = 'https://js.arcgis.com/5.0.15/@arcgis/core/assets';


interface ArcGISMapProps {
  example: MapExample;
}

export default function ArcGISMap({ example }: ArcGISMapProps) {
  const mapDiv = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | SceneView | null>(null);

  useEffect(() => {
    if (!mapDiv.current) return;

    // Clean up previous view if it exists
    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }

    const map = new Map({
      basemap: example.basemap,
      ...(example.ground ? { ground: example.ground } : {})
    });

    const viewProperties = {
      container: mapDiv.current,
      map: map,
      center: example.center || [80.7718, 7.8731], // Longitude, latitude of Sri Lanka
      zoom: example.zoom || 7,
    };

    let view: MapView | SceneView;

    if (example.type === '3d') {
      view = new SceneView({
        ...viewProperties,
        camera: example.camera || {
          position: [80.7718, 2.0, 2000000], // Longitude, latitude, elevation
          heading: 0,
          tilt: 25,
        },
      });
    } else {
      view = new MapView(viewProperties);
    }

    viewRef.current = view;

    view.when(() => {
      if (example.setup) {
        example.setup(view, map);
      }
    });

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [example]);

  return <div className="w-full h-full" ref={mapDiv}></div>;
}
