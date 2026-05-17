import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';


const DEFAULT_LAT = 55.751244;
const DEFAULT_LNG = 37.618423;

export const useUserLocation = (initialLat?: number, initialLng?: number) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (!isMounted) return;

      if (status !== 'granted') {
        Alert.alert('Разрешение не получено', 'Будет использовано местоположение по умолчанию');
        setLocation({ lat: initialLat ?? DEFAULT_LAT, lng: initialLng ?? DEFAULT_LNG });
        setLoading(false);
        return;
      }

      try {
        const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setLocation({
          lat: initialLat ?? coords.latitude,
          lng: initialLng ?? coords.longitude,
        });
      } catch (error) {
        console.error(error);
        Alert.alert('Ошибка геолокации', 'Не удалось определить ваше местоположение');
        setLocation({ lat: initialLat ?? DEFAULT_LAT, lng: initialLng ?? DEFAULT_LNG });
      } finally {
        setLoading(false);
      }
    };
    getLocation();
    return () => { isMounted = false; };
  }, [initialLat, initialLng]);

  return { location, loading };
};