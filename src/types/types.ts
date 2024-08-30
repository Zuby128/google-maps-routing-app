interface Coordinates {
  lat: number;
  lng: number;
}

interface MarkerProps {
  id: string;
  lat: number;
  lng: number;
  color?: string;
  title?: string;
}

interface MapComponentProps {
  markers: MarkerProps[];
  onMapClick: (coords: Coordinates) => void;
}
