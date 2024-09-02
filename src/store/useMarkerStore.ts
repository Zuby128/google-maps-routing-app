import { create } from "zustand";
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
  loading: boolean;
  addMarker: (marker: Omit<MarkerProps, "id">) => void;
  updateMarker: (updatedMarker: MarkerProps) => void;
  deleteMarker: (id: string) => void;
  setCoordinate: (coordinate: Coordinates) => void;
  getMarkerById: (id: string) => MarkerProps | undefined;
  setLoading: (loading: boolean) => void;
  loadMarkers: () => void;
}

export const useMarkerStore = create<MarkerState>((set, get) => ({
  markers: [],
  coordinate: null,
  loading: true,

  setLoading: (loading: boolean) => set({ loading }),

  loadMarkers: () => {
    set({ loading: true });
    if (typeof window !== "undefined") {
      const storedMarkers = JSON.parse(localStorage.getItem("markers") || "[]");
      set({ markers: storedMarkers, loading: false });
    }
  },

  addMarker: (marker: Omit<MarkerProps, "id">) => {
    set({ loading: true });
    const newMarker: MarkerProps = { ...marker, id: uuidv4() };
    const updatedMarkers = [...get().markers, newMarker];
    if (typeof window !== "undefined") {
      localStorage.setItem("markers", JSON.stringify(updatedMarkers));
    }
    set({ markers: updatedMarkers, loading: false });
  },

  updateMarker: (updatedMarker: MarkerProps) => {
    set({ loading: true });
    const updatedMarkers = get().markers.map((marker) =>
      marker.id === updatedMarker.id ? updatedMarker : marker
    );
    if (typeof window !== "undefined") {
      localStorage.setItem("markers", JSON.stringify(updatedMarkers));
    }
    set({ markers: updatedMarkers, loading: false });
  },

  deleteMarker: (id: string) => {
    set({ loading: true });
    const updatedMarkers = get().markers.filter((marker) => marker.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem("markers", JSON.stringify(updatedMarkers));
    }
    set({ markers: updatedMarkers, loading: false });
  },

  setCoordinate: (coordinate: Coordinates) => set({ coordinate }),

  getMarkerById: (id: string) => {
    return get().markers.find((marker) => marker.id === id);
  },
}));
