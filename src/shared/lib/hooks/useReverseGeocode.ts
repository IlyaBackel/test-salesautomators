import * as Location from 'expo-location';
import { useCallback, useState } from 'react';

export const useReverseGeocode = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAddress = useCallback(async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const results = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
      if (results.length > 0) {
        const addr = results[0];
        const addrStr = `${addr.name || ''} ${addr.street || ''} ${addr.city || ''}`.trim();
        setAddress(addrStr || `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      } else {
        setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    } catch (error) {
      console.log(error);
      setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    } finally {
      setLoading(false);
    }
  }, []); 

  return { address, fetchAddress, loading };
};