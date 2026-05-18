import { useReverseGeocode } from '@/src/shared/lib/hooks/useReverseGeocode';
import { useUserLocation } from '@/src/shared/lib/hooks/useUserLocation';
import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Region } from 'react-native-maps';

export const useLocationPicker = (initialLat?: number, initialLng?: number) => {
    const { location, loading: locationLoading } = useUserLocation(initialLat, initialLng);
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

    const handleRegionChange = useCallback(async (newRegion: Region) => {
        setRegion(newRegion);
        await fetchAddress(newRegion.latitude, newRegion.longitude);
    }, [fetchAddress]);

    const goToUserLocation = useCallback(async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No permissions', 'Could not determine your location');
            return;
        }
        try {
            const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            return { lat: coords.latitude, lng: coords.longitude };
        } catch (e) {
            console.log(e)
            Alert.alert('Error', 'Could not determine location');
            return null;
        }
    }, []);

    const confirmLocation = useCallback(() => {
        if (region) {
            return { lat: region.latitude, lng: region.longitude, address };
        }
        Alert.alert('No location', 'Please wait for map loading');
        return null;
    }, [region, address]);

    return {
        region,
        address,
        locationLoading,
        handleRegionChange,
        goToUserLocation,
        confirmLocation,
        setRegion,
        fetchAddress,
    };
};