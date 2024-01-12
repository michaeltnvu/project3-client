import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";

const Explore = () => {
  const [center, setCenter] = useState({
    lat: 25.79838919309663,
    lon: -80.23359123139029,
  });
  const ZOOM_LEVEL = 10;

  return (
    <div className="explore-page">
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        style={{ width: "100vw", height: "50vh" }}
        zoomDelta="0.25"
      >
        <TileLayer
          noWrap="true"
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=zsktKh6MrNj5tYjEXR0n"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
      </MapContainer>
    </div>
  );
};

export default Explore;
