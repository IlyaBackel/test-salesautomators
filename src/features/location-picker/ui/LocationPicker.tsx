import { useTheme } from '@/src/app/providers/ThemeProvider';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { useLocationPicker } from '../hooks/useLocationPicker';
import { AddressCard } from './AddressCard';
import { ConfirmButton } from './ConfirmButton';
import { LoadingView } from './LoadingView';
import { LocationButton } from './LocationButton';
import { LocationMap } from './LocationMap';

interface Props {
  initialLatitude?: number;
  initialLongitude?: number;
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export default function LocationPicker({ initialLatitude, initialLongitude, onLocationSelect }: Props) {
  const { colors } = useTheme();
  const mapRef = useRef<MapView>(null);
  const {
    region,
    address,
    locationLoading,
    handleRegionChange,
    goToUserLocation,
    confirmLocation,
  } = useLocationPicker(initialLatitude, initialLongitude);

  const handleGoToUser = async () => {
    const coords = await goToUserLocation();
    if (coords && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: coords.lat,
        longitude: coords.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    }
  };

  const handleConfirm = () => {
    const result = confirmLocation();
    if (result) {
      onLocationSelect(result.lat, result.lng, result.address);
    }
  };

  if (locationLoading || !region) {
    return <LoadingView color={colors.BUTTON.PRIMARY} backgroundColor={colors.BACKGROUND.CARD} />;
  }

  return (
    <View style={styles.container}>
      <LocationMap ref={mapRef} region={region} onRegionChange={handleRegionChange} />
      <AddressCard
        address={address}
        backgroundColor={colors.BACKGROUND.CARD}
        borderColor={colors.BORDER}
        textColor={colors.TEXT.PRIMARY}
      />
      <View style={styles.buttonRow}>
        <LocationButton onPress={handleGoToUser} color={colors.BUTTON.PRIMARY} />
        <ConfirmButton onPress={handleConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 15 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
});