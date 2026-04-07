import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Search from "@arcgis/core/widgets/Search";
import Legend from "@arcgis/core/widgets/Legend";
import LayerList from "@arcgis/core/widgets/LayerList";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Compass from "@arcgis/core/widgets/Compass";
import Locate from "@arcgis/core/widgets/Locate";
import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D";
import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";
import Sketch from "@arcgis/core/widgets/Sketch";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline";
import Polygon from "@arcgis/core/geometry/Polygon";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import Swipe from "@arcgis/core/widgets/Swipe";
import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer";
import Basemap from "@arcgis/core/Basemap";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";

export interface MapExample {
  id: string;
  title: string;
  description: string;
  type: '2d' | '3d';
  basemap: string;
  center?: [number, number];
  zoom?: number;
  camera?: any;
  ground?: string;
  setup?: (view: MapView | SceneView, map: Map) => void;
}

export const examples: MapExample[] = [
  { id: '1', title: '2D Map (Topo)', description: 'Basic 2D map with topographic basemap.', type: '2d', basemap: 'topo-vector' },
  { id: '2', title: '2D Map (Satellite)', description: 'Basic 2D map with satellite imagery.', type: '2d', basemap: 'satellite' },
  { id: '3', title: '2D Map (Streets)', description: 'Basic 2D map with street map.', type: '2d', basemap: 'streets-vector' },
  { id: '4', title: '2D Map (Oceans)', description: 'Basic 2D map with oceans basemap.', type: '2d', basemap: 'oceans' },
  { id: '5', title: '2D Map (Gray)', description: 'Basic 2D map with light gray canvas.', type: '2d', basemap: 'gray-vector' },
  { id: '6', title: '2D Map (Dark Gray)', description: 'Basic 2D map with dark gray canvas.', type: '2d', basemap: 'dark-gray-vector' },
  { id: '7', title: '2D Map (OSM)', description: 'Basic 2D map with OpenStreetMap.', type: '2d', basemap: 'osm' },
  { id: '8', title: '2D Map (Hybrid)', description: 'Basic 2D map with hybrid imagery and labels.', type: '2d', basemap: 'hybrid' },
  { id: '9', title: '2D Map (Terrain)', description: 'Basic 2D map with terrain basemap.', type: '2d', basemap: 'terrain' },
  
  { id: '10', title: '3D Scene (Topo)', description: 'Basic 3D scene with topographic basemap.', type: '3d', basemap: 'topo-vector' },
  { id: '11', title: '3D Scene (Satellite)', description: 'Basic 3D scene with satellite imagery.', type: '3d', basemap: 'satellite' },
  { id: '12', title: '3D Scene (Hybrid)', description: 'Basic 3D scene with hybrid imagery.', type: '3d', basemap: 'hybrid' },
  { id: '13', title: '3D Scene (Oceans)', description: 'Basic 3D scene with oceans basemap.', type: '3d', basemap: 'oceans' },
  
  { 
    id: '14', 
    title: 'Point Graphic (Colombo)', 
    description: 'Adds a point graphic at Colombo, Sri Lanka.', 
    type: '2d', 
    basemap: 'streets-vector',
    setup: (view, map) => {
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      const point = new Point({ longitude: 79.8612, latitude: 6.9271 });
      const symbol = new SimpleMarkerSymbol({ color: [226, 119, 40], outline: { color: [255, 255, 255], width: 2 } });
      graphicsLayer.add(new Graphic({ geometry: point, symbol }));
    }
  },
  { 
    id: '15', 
    title: 'Line Graphic', 
    description: 'Adds a line graphic across Sri Lanka.', 
    type: '2d', 
    basemap: 'topo-vector',
    setup: (view, map) => {
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      const polyline = new Polyline({ paths: [[[79.8612, 6.9271], [80.6366, 7.2906], [81.2152, 8.5873]]] });
      const symbol = new SimpleLineSymbol({ color: [226, 119, 40], width: 4 });
      graphicsLayer.add(new Graphic({ geometry: polyline, symbol }));
    }
  },
  { 
    id: '16', 
    title: 'Polygon Graphic', 
    description: 'Adds a polygon graphic in central Sri Lanka.', 
    type: '2d', 
    basemap: 'gray-vector',
    setup: (view, map) => {
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      const polygon = new Polygon({ rings: [[[80.5, 7.0], [81.0, 7.0], [81.0, 7.5], [80.5, 7.5], [80.5, 7.0]]] });
      const symbol = new SimpleFillSymbol({ color: [227, 139, 79, 0.8], outline: { color: [255, 255, 255], width: 1 } });
      graphicsLayer.add(new Graphic({ geometry: polygon, symbol }));
    }
  },
  { 
    id: '17', 
    title: 'Feature Layer (Earthquakes)', 
    description: 'Loads a sample earthquake feature layer.', 
    type: '2d', 
    basemap: 'dark-gray-vector',
    setup: (view, map) => {
      const featureLayer = new FeatureLayer({ url: "https://services.arcgis.com/ue9rwulIoeLEI9jv/arcgis/rest/services/Earthquakes/FeatureServer/0" });
      map.add(featureLayer);
    }
  },
  { 
    id: '18', 
    title: 'GeoJSON Layer', 
    description: 'Loads a sample GeoJSON layer.', 
    type: '2d', 
    basemap: 'topo-vector',
    setup: (view, map) => {
      const geojsonLayer = new GeoJSONLayer({ url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson" });
      map.add(geojsonLayer);
    }
  },
  { 
    id: '19', 
    title: 'Search Widget', 
    description: 'Adds a search widget to find locations.', 
    type: '2d', 
    basemap: 'streets-vector',
    setup: (view) => {
      const search = new Search({ view });
      view.ui.add(search, "top-right");
    }
  },
  { 
    id: '20', 
    title: 'Legend Widget', 
    description: 'Adds a legend widget.', 
    type: '2d', 
    basemap: 'topo-vector',
    setup: (view, map) => {
      const featureLayer = new FeatureLayer({ url: "https://services.arcgis.com/ue9rwulIoeLEI9jv/arcgis/rest/services/Earthquakes/FeatureServer/0" });
      map.add(featureLayer);
      const legend = new Legend({ view });
      view.ui.add(legend, "bottom-right");
    }
  },
  { 
    id: '21', 
    title: 'LayerList Widget', 
    description: 'Adds a layer list widget.', 
    type: '2d', 
    basemap: 'satellite',
    setup: (view, map) => {
      const featureLayer = new FeatureLayer({ url: "https://services.arcgis.com/ue9rwulIoeLEI9jv/arcgis/rest/services/Earthquakes/FeatureServer/0" });
      map.add(featureLayer);
      const layerList = new LayerList({ view });
      view.ui.add(layerList, "top-right");
    }
  },
  { 
    id: '22', 
    title: 'BasemapGallery Widget', 
    description: 'Adds a basemap gallery widget.', 
    type: '2d', 
    basemap: 'topo-vector',
    setup: (view) => {
      const basemapGallery = new BasemapGallery({ view });
      view.ui.add(basemapGallery, "top-right");
    }
  },
  { 
    id: '23', 
    title: 'ScaleBar Widget', 
    description: 'Adds a scale bar widget.', 
    type: '2d', 
    basemap: 'streets-vector',
    setup: (view) => {
      const scaleBar = new ScaleBar({ view: view as MapView });
      view.ui.add(scaleBar, "bottom-left");
    }
  },
  { 
    id: '24', 
    title: 'Compass Widget', 
    description: 'Adds a compass widget.', 
    type: '2d', 
    basemap: 'satellite',
    setup: (view) => {
      const compass = new Compass({ view: view as MapView });
      view.ui.add(compass, "top-left");
    }
  },
  { 
    id: '25', 
    title: 'Locate Widget', 
    description: 'Adds a locate widget to find user location.', 
    type: '2d', 
    basemap: 'streets-vector',
    setup: (view) => {
      const locate = new Locate({ view });
      view.ui.add(locate, "top-left");
    }
  },
  { 
    id: '26', 
    title: 'Distance Measurement', 
    description: 'Adds a distance measurement widget.', 
    type: '2d', 
    basemap: 'topo-vector',
    setup: (view) => {
      const measurement = new DistanceMeasurement2D({ view: view as MapView });
      view.ui.add(measurement, "top-right");
    }
  },
  { 
    id: '27', 
    title: 'Area Measurement', 
    description: 'Adds an area measurement widget.', 
    type: '2d', 
    basemap: 'topo-vector',
    setup: (view) => {
      const measurement = new AreaMeasurement2D({ view: view as MapView });
      view.ui.add(measurement, "top-right");
    }
  },
  { 
    id: '28', 
    title: 'Sketch Widget', 
    description: 'Adds a sketch widget for drawing.', 
    type: '2d', 
    basemap: 'streets-vector',
    setup: (view, map) => {
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      const sketch = new Sketch({ layer: graphicsLayer, view: view as MapView });
      view.ui.add(sketch, "top-right");
    }
  },
  { 
    id: '29', 
    title: '3D Scene with Search', 
    description: '3D scene with a search widget.', 
    type: '3d', 
    basemap: 'satellite',
    setup: (view) => {
      const search = new Search({ view });
      view.ui.add(search, "top-right");
    }
  },
  { 
    id: '30', 
    title: 'Multiple Graphics', 
    description: 'Adds multiple graphics to the map.', 
    type: '2d', 
    basemap: 'gray-vector',
    setup: (view, map) => {
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      
      const p1 = new Point({ longitude: 79.8612, latitude: 6.9271 });
      const p2 = new Point({ longitude: 80.6366, latitude: 7.2906 });
      const p3 = new Point({ longitude: 81.2152, latitude: 8.5873 });
      
      const symbol = new SimpleMarkerSymbol({ color: [0, 150, 255], outline: { color: [255, 255, 255], width: 1 } });
      
      graphicsLayer.addMany([
        new Graphic({ geometry: p1, symbol }),
        new Graphic({ geometry: p2, symbol }),
        new Graphic({ geometry: p3, symbol })
      ]);
    }
  }
];

export const specificExamples: MapExample[] = [
  {
    id: 's1',
    title: 'Southern Tourism Map',
    description: '2D MapView centered on the South Coast using a GraphicsLayer to plot custom markers for tourist spots with detailed popups.',
    type: '2d',
    basemap: 'hybrid',
    center: [80.75, 6.15],
    zoom: 9,
    setup: (view, map) => {
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      
      const spots = [
        { name: "Mirissa Beach", desc: "Famous for whale watching and surfing.", lon: 80.4572, lat: 5.9483 },
        { name: "Galle Fort", desc: "Historic Dutch fort built in the 16th century.", lon: 80.2170, lat: 6.0258 },
        { name: "Unawatuna Beach", desc: "Popular beach with coral reefs and palm trees.", lon: 80.2486, lat: 6.0118 },
        { name: "Yala National Park", desc: "Wildlife park known for leopards and elephants.", lon: 81.5000, lat: 6.3600 },
        { name: "Hikkaduwa Beach", desc: "Vibrant beach town with coral sanctuary.", lon: 80.1000, lat: 6.1400 },
        { name: "Tangalle Beach", desc: "Quiet, expansive beaches on the southern coast.", lon: 80.7900, lat: 6.0200 },
        { name: "Udawalawe National Park", desc: "Renowned for its large elephant population.", lon: 80.8800, lat: 6.4300 },
        { name: "Sinharaja Forest", desc: "A UNESCO World Heritage rainforest.", lon: 80.4500, lat: 6.4000 }
      ];

      const symbol = new SimpleMarkerSymbol({ 
        color: [255, 204, 0], 
        size: "14px",
        outline: { color: [255, 255, 255], width: 2 } 
      });

      spots.forEach(spot => {
        const point = new Point({ longitude: spot.lon, latitude: spot.lat });
        const popupTemplate = new PopupTemplate({
          title: "{Name}",
          content: "<div style='padding: 5px;'><b>Description:</b> {Description}<br/><br/><i>Coordinates: {Lat}, {Lon}</i></div>"
        });
        const graphic = new Graphic({
          geometry: point,
          symbol: symbol,
          attributes: { Name: spot.name, Description: spot.desc, Lat: spot.lat.toFixed(4), Lon: spot.lon.toFixed(4) },
          popupTemplate: popupTemplate
        });
        graphicsLayer.add(graphic);
      });
    }
  },
  {
    id: 's2',
    title: 'Colombo Imagery Swipe',
    description: '2D MapView centered on Colombo with a Swipe widget to compare streets and satellite basemaps.',
    type: '2d',
    basemap: 'satellite',
    center: [79.8612, 6.9271],
    zoom: 13,
    setup: (view, map) => {
      const streetsLayer = new VectorTileLayer({
        portalItem: { id: "4ce5edb229724183818e95a1200214a1" } // Navigation map
      });
      map.add(streetsLayer);
      
      const swipe = new Swipe({
        leadingLayers: [streetsLayer],
        position: 50,
        view: view as MapView
      });
      view.ui.add(swipe);
    }
  },
  {
    id: 's3',
    title: 'Highlands 3D Terrain',
    description: '3D SceneView centered on Nuwara Eliya showing the 3D topography of the mountains with peak markers.',
    type: '3d',
    basemap: 'satellite',
    ground: 'world-elevation',
    camera: {
      position: [80.78, 6.6, 15000],
      heading: 0,
      tilt: 75
    },
    setup: (view, map) => {
      const graphicsLayer = new GraphicsLayer({ elevationInfo: { mode: "relative-to-ground", offset: 100 } });
      map.add(graphicsLayer);

      const peaks = [
        { name: "Pidurutalagala", elev: "2,524 m", lon: 80.77, lat: 7.00 },
        { name: "Adam's Peak", elev: "2,243 m", lon: 80.49, lat: 6.80 },
        { name: "Horton Plains", elev: "2,100 m", lon: 80.80, lat: 6.80 },
        { name: "Ella Rock", elev: "1,041 m", lon: 81.04, lat: 6.86 }
      ];

      peaks.forEach(peak => {
        const point = new Point({ longitude: peak.lon, latitude: peak.lat });
        const textSymbol = new TextSymbol({
          text: `${peak.name}\n(${peak.elev})`,
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          font: { size: 11, weight: "bold" },
          yoffset: 20
        });
        const markerSymbol = new SimpleMarkerSymbol({
          color: [255, 50, 50],
          size: "8px",
          outline: { color: [255, 255, 255], width: 1 }
        });
        
        graphicsLayer.add(new Graphic({ geometry: point, symbol: markerSymbol }));
        graphicsLayer.add(new Graphic({ geometry: point, symbol: textSymbol }));
      });
    }
  },
  {
    id: 's4',
    title: 'Land Measurement Tool',
    description: '2D MapView centered on Anuradhapura with AreaMeasurement2D and DistanceMeasurement2D widgets. Includes ancient ruins to measure.',
    type: '2d',
    basemap: 'satellite',
    center: [80.3966, 8.3514],
    zoom: 15,
    setup: (view, map) => {
      const areaMeasurement = new AreaMeasurement2D({ view: view as MapView });
      const distanceMeasurement = new DistanceMeasurement2D({ view: view as MapView });
      
      view.ui.add(areaMeasurement, "top-right");
      view.ui.add(distanceMeasurement, "top-right");

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      const ruins = [
        { name: "Ruwanwelisaya", lon: 80.3966, lat: 8.3500 },
        { name: "Jetavanaramaya", lon: 80.4036, lat: 8.3514 },
        { name: "Abhayagiri Vihāra", lon: 80.3950, lat: 8.3600 },
        { name: "Sri Maha Bodhi", lon: 80.3966, lat: 8.3440 }
      ];

      ruins.forEach(ruin => {
        const point = new Point({ longitude: ruin.lon, latitude: ruin.lat });
        const textSymbol = new TextSymbol({
          text: ruin.name,
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          font: { size: 12, weight: "bold" },
          yoffset: 10
        });
        graphicsLayer.add(new Graphic({ geometry: point, symbol: textSymbol }));
      });
    }
  },
  {
    id: 's5',
    title: 'Population Heatmap',
    description: '2D MapView showing a static heatmap of major Sri Lankan cities with labels.',
    type: '2d',
    basemap: 'dark-gray-vector',
    center: [80.7718, 7.8731],
    zoom: 7,
    setup: (view, map) => {
      const cities = [
        { name: "Colombo", pop: 752993, lon: 79.8612, lat: 6.9271 },
        { name: "Dehiwala-Mount Lavinia", pop: 245974, lon: 79.8712, lat: 6.8402 },
        { name: "Moratuwa", pop: 207755, lon: 79.8805, lat: 6.7730 },
        { name: "Sri Jayawardenepura Kotte", pop: 135806, lon: 79.9061, lat: 6.8860 },
        { name: "Negombo", pop: 127754, lon: 79.8358, lat: 7.2008 },
        { name: "Kandy", pop: 125351, lon: 80.6366, lat: 7.2906 },
        { name: "Kalmunai", pop: 106783, lon: 81.8200, lat: 7.4200 },
        { name: "Vavuniya", pop: 101500, lon: 80.4971, lat: 8.7542 },
        { name: "Galle", pop: 99478, lon: 80.2170, lat: 6.0328 },
        { name: "Trincomalee", pop: 99135, lon: 81.2152, lat: 8.5873 },
        { name: "Batticaloa", pop: 92332, lon: 81.6924, lat: 7.7102 },
        { name: "Jaffna", pop: 88138, lon: 80.0088, lat: 9.6615 },
        { name: "Katunayake", pop: 76816, lon: 79.8800, lat: 7.1667 },
        { name: "Dambulla", pop: 68821, lon: 80.6495, lat: 7.8596 },
        { name: "Kolonnawa", pop: 64887, lon: 79.8833, lat: 6.9333 },
        { name: "Anuradhapura", pop: 63208, lon: 80.3966, lat: 8.3114 },
        { name: "Ratnapura", pop: 52170, lon: 80.3998, lat: 6.6828 },
        { name: "Badulla", pop: 47587, lon: 81.0550, lat: 6.9847 },
        { name: "Matara", pop: 47420, lon: 80.5469, lat: 5.9485 },
        { name: "Puttalam", pop: 45401, lon: 79.8283, lat: 8.0362 }
      ];

      const graphics = cities.map(city => {
        return new Graphic({
          geometry: new Point({ longitude: city.lon, latitude: city.lat }),
          attributes: {
            ObjectID: Math.floor(Math.random() * 100000),
            Name: city.name,
            Population: city.pop
          }
        });
      });

      const heatmapRenderer = new HeatmapRenderer({
        field: "Population",
        colorStops: [
          { color: "rgba(63, 40, 102, 0)", ratio: 0 },
          { color: "#472b66", ratio: 0.083 },
          { color: "#533067", ratio: 0.166 },
          { color: "#633c69", ratio: 0.250 },
          { color: "#7a516b", ratio: 0.333 },
          { color: "#93666d", ratio: 0.416 },
          { color: "#ab7c6f", ratio: 0.500 },
          { color: "#c49370", ratio: 0.583 },
          { color: "#dca972", ratio: 0.666 },
          { color: "#f3c074", ratio: 0.750 },
          { color: "#fbd877", ratio: 0.833 },
          { color: "#ffef7a", ratio: 0.916 },
          { color: "#ffff80", ratio: 1 }
        ],
        maxPixelIntensity: 1000000,
        minPixelIntensity: 0
      });

      const featureLayer = new FeatureLayer({
        source: graphics,
        objectIdField: "ObjectID",
        fields: [
          { name: "ObjectID", type: "oid" },
          { name: "Name", type: "string" },
          { name: "Population", type: "integer" }
        ],
        renderer: heatmapRenderer,
        labelingInfo: [{
          labelExpressionInfo: { expression: "$feature.Name" },
          symbol: new TextSymbol({
            color: "white",
            haloColor: "black",
            haloSize: "1px",
            font: { size: 10, family: "sans-serif" }
          }),
          minScale: 0,
          maxScale: 0
        }]
      });

      map.add(featureLayer);
    }
  }
];
