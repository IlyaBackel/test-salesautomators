import { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

interface LocationMapProps {
  region: Region;
  onRegionChange: (region: Region) => void;
}

export const LocationMap = forwardRef<MapView, LocationMapProps>(
  ({ region, onRegionChange }, ref) => (
    <MapView
      ref={ref}
      style={styles.map}
      region={region}
      onRegionChangeComplete={onRegionChange}
      showsUserLocation
      showsMyLocationButton={false}
    >
      <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
    </MapView>
  )
);

LocationMap.displayName = 'LocationMap';

const styles = StyleSheet.create({
  map: { width: '100%', height: 300, borderRadius: 12, marginBottom: 10 },
});