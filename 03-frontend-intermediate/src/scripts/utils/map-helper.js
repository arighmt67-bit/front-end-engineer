import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Perbaiki path ikon default Leaflet saat di-bundle (Vite mengubah nama berkas).
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/**
 * Membuat peta dengan MULTIPLE TILE LAYER + layer control (kriteria 2 - Advance).
 */
export function createMap(container, { center, zoom = 5 } = {}) {
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  });

  const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenTopoMap (CC-BY-SA)',
    maxZoom: 17,
  });

  const carto = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    { attribution: '&copy; OpenStreetMap contributors &copy; CARTO', maxZoom: 19 },
  );

  const map = L.map(container, {
    center,
    zoom,
    layers: [osm],
  });

  L.control
    .layers(
      { 'OpenStreetMap': osm, 'Topografi': topo, 'Carto Terang': carto },
      {},
      { position: 'topright' },
    )
    .addTo(map);

  return map;
}

export { L };
