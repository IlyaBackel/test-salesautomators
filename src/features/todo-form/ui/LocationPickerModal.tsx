import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import LocationPicker from './LocationPicker';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (lat: number, lng: number, address: string) => void;
  initialLat?: number;
  initialLng?: number;
}

export default function LocationPickerModal({ visible, onClose, onSelect, initialLat, initialLng }: Props) {
  const handleSelect = (lat: number, lng: number, address: string) => {
    onSelect(lat, lng, address);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <LocationPicker
          initialLatitude={initialLat}
          initialLongitude={initialLng}
          onLocationSelect={handleSelect}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, marginTop: 50, marginHorizontal: 10 },
});