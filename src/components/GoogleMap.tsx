import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { Box, Container, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

export const defaultMapContainerStyle = {
  width: "100%",
  height: "50vh",
  borderRadius: "8px",
};

const defaultMapCenter = {
  lat: 37.784562,
  lng: 29.08396,
};
const defaultMapZoom = 13;
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
};

const GoogleMapComponent: React.FC<MapComponentProps> = ({
  markers,
  setCoordinate,
  coordinate,
}) => {
  const pathname = usePathname();
  const [selectedMarker, setSelectedMarker] = useState<MarkerProps | null>(
    null
  );
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(
    null
  );
  const [open, setOpen] = useState<boolean>(false);
  const [path, setPath] = useState<Coordinates[]>([]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          toast.error(
            `Error getting location: ${error.message}. \nPlease select your current location manually`,
            {
              duration: 5000,
            }
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const calculateDistance = (coord1: Coordinates, coord2: Coordinates) => {
    const latLng1 = new google.maps.LatLng(coord1.lat, coord1.lng);
    const latLng2 = new google.maps.LatLng(coord2.lat, coord2.lng);
    return google.maps.geometry.spherical.computeDistanceBetween(
      latLng1,
      latLng2
    );
  };

  const sortMarkersByDistance = () => {
    if (!coordinate) return [];

    return markers
      .map((marker) => ({
        ...marker,
        distance: calculateDistance(coordinate, {
          lat: marker.lat,
          lng: marker.lng,
        }),
      }))
      .sort((a, b) => a.distance - b.distance)
      .map((marker) => ({
        lat: marker.lat,
        lng: marker.lng,
      }));
  };

  const onSetPath = () => {
    if (!coordinate) return;
    const sortedPath = sortMarkersByDistance();
    sortedPath.unshift(coordinate);
    setPath(sortedPath);
  };

  const openLocationInfo = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    onSetPath();
  }, [coordinate]);

  useEffect(() => {
    if (pathname === "/locations-map") {
      getCurrentLocation();
    }
  }, []);

  return (
    <Container maxW={"1200px"}>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={{
          lat: markers[0]?.lat || defaultMapCenter.lat,
          lng: markers[0]?.lng || defaultMapCenter.lng,
        }}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
        onClick={(e: google.maps.MapMouseEvent) =>
          setCoordinate!({
            lat: e.latLng?.lat() as number,
            lng: e.latLng?.lng() as number,
          })
        }
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}-pushpin.png`,
            }}
            onClick={() => {
              setSelectedMarker(marker);
            }}
          />
        ))}

        <Polyline
          path={path}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <Box>
              <Text variant="h2">{selectedMarker.title}</Text>
              <Text>{`Latitude: ${selectedMarker.lat}`}</Text>
              <Text>{`Longitude: ${selectedMarker.lng}`}</Text>
            </Box>
          </InfoWindow>
        )}

        {coordinate && (
          <Marker
            position={coordinate}
            icon={{
              url: `http://maps.google.com/mapfiles/ms/icons/green-dot.png`,
            }}
            onClick={openLocationInfo}
          />
        )}
        {coordinate && open && (
          <InfoWindow position={coordinate} onCloseClick={openLocationInfo}>
            <Box>
              <Text variant="h2">current location</Text>
              <Text>{`Latitude: ${coordinate.lat}`}</Text>
              <Text>{`Longitude: ${coordinate.lng}`}</Text>
            </Box>
          </InfoWindow>
        )}

        {currentPosition && (
          <Marker
            position={currentPosition}
            icon={{
              url: `http://maps.google.com/mapfiles/ms/icons/blue-dot.png`,
            }}
            onClick={openLocationInfo}
          />
        )}
        {currentPosition && open && (
          <InfoWindow
            position={currentPosition}
            onCloseClick={openLocationInfo}
          >
            <Box>
              <Text variant="h2">Your Current Position</Text>
              <Text>{`Latitude: ${currentPosition.lat}`}</Text>
              <Text>{`Longitude: ${currentPosition.lng}`}</Text>
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>
    </Container>
  );
};

export default GoogleMapComponent;
