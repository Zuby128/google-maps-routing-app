import create from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Coordinates {
  lat: number;
  lng: number;
}

interface MarkerProps extends Coordinates {
  id: string;
  color: string;
  title: string;
}

interface MarkerState {
  markers: MarkerProps[];
  coordinate: Coordinates | null;
  addMarker: (marker: Omit<MarkerProps, "id">) => void;
  updateMarker: (updatedMarker: MarkerProps) => void;
  deleteMarker: (id: string) => void;
  setCoordinate: (coordinate: Coordinates) => void;
  getMarkerById: (id: string) => MarkerProps | undefined;
}

export const useMarkerStore = create<MarkerState>((set, get) => ({
  markers: JSON.parse(localStorage.getItem("markers") || "[]"),
  coordinate: null,

  addMarker: (marker: Omit<MarkerProps, "id">) => {
    const newMarker: MarkerProps = { ...marker, id: uuidv4() };
    const updatedMarkers = [...get().markers, newMarker];
    localStorage.setItem("markers", JSON.stringify(updatedMarkers));
    set({ markers: updatedMarkers });
  },

  updateMarker: (updatedMarker: MarkerProps) => {
    const updatedMarkers = get().markers.map((marker) =>
      marker.id === updatedMarker.id ? updatedMarker : marker
    );
    localStorage.setItem("markers", JSON.stringify(updatedMarkers));
    set({ markers: updatedMarkers });
  },

  deleteMarker: (id: string) => {
    const updatedMarkers = get().markers.filter((marker) => marker.id !== id);
    localStorage.setItem("markers", JSON.stringify(updatedMarkers));
    set({ markers: updatedMarkers });
  },

  setCoordinate: (coordinate: Coordinates) => set({ coordinate }),

  getMarkerById: (id: string) => {
    return get().markers.find((marker) => marker.id === id);
  },
}));
