interface Coordinates {
  lat: number;
  lng: number;
}

interface MarkerProps {
  id?: string;
  lat: number;
  lng: number;
  color: string;
  title: string;
}

interface MapComponentProps {
  setCoordinate?: React.Dispatch<React.SetStateAction<Coordinates | null>>;
  coordinate?: Coordinates | null;
  markers: MarkerProps[];
  onMapClick?: (coords: Coordinates) => void;
}
