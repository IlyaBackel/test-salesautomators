import { useTheme } from '@/src/app/providers/ThemeProvider';
import { useReverseGeocode } from '@/src/shared/lib/hooks/useReverseGeocode';
import { useUserLocation } from '@/src/shared/lib/hooks/useUserLocation';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { AddressCard } from './AddressCard';
import { LoadingView } from './LoadingView';
import { LocationButton } from './LocationButton';

interface Props {
  initialLatitude?: number;
  initialLongitude?: number;
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export default function LocationPicker({ initialLatitude, initialLongitude, onLocationSelect }: Props) {
  const { colors } = useTheme();
  const mapRef = useRef<MapView>(null);
  const { location, loading: locationLoading } = useUserLocation(initialLatitude, initialLongitude);
  const { address, fetchAddress } = useReverseGeocode();
  const [region, setRegion] = useState<Region | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (location && !isInitialized) {
      const newRegion = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setRegion(newRegion);
      fetchAddress(location.lat, location.lng);
      setIsInitialized(true);
    }
  }, [location, isInitialized, fetchAddress]);

  const handleRegionChangeComplete = useCallback(async (newRegion: Region) => {
    setRegion(newRegion);
    await fetchAddress(newRegion.latitude, newRegion.longitude);
  }, [fetchAddress]);

  const goToUserLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Нет разрешения', 'Не удалось определить ваше местоположение');
      return;
    }
    try {
      const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      mapRef.current?.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
      await fetchAddress(coords.latitude, coords.longitude);
    } catch (e) {
      console.log(e);
      Alert.alert('Ошибка', 'Не удалось определить местоположение');
    }
  }, [fetchAddress]);

  const confirmLocation = useCallback(() => {
    if (region) {
      onLocationSelect(region.latitude, region.longitude, address);
    } else {
      Alert.alert('Нет местоположения', 'Пожалуйста, подождите загрузки карты');
    }
  }, [region, address, onLocationSelect]);

  if (locationLoading || !region) {
    return <LoadingView color={colors.BUTTON.PRIMARY} backgroundColor={colors.BACKGROUND.CARD} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation
        showsMyLocationButton={false}
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
      </MapView>

      <AddressCard
        address={address}
        backgroundColor={colors.BACKGROUND.CARD}
        borderColor={colors.BORDER}
        textColor={colors.TEXT.PRIMARY}
      />

      <View style={styles.buttonRow}>
        <LocationButton onPress={goToUserLocation} color={colors.BUTTON.PRIMARY} />
        <TouchableOpacity style={[styles.confirmButton, { backgroundColor: colors.BUTTON.PRIMARY }]} onPress={confirmLocation}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 15 },
  map: { width: '100%', height: 300, borderRadius: 12, marginBottom: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  confirmButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  confirmText: { color: '#fff', fontWeight: 'bold' },
});