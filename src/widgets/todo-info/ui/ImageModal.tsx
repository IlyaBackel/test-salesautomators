import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';

interface ImageModalProps {
  visible: boolean;
  uri: string | null;
  onClose: () => void;
}

export const ImageModal = ({ visible, uri, onClose }: ImageModalProps) => (
  <Modal visible={visible} transparent={false} onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={onClose}>
      {uri && <Image source={{ uri }} style={styles.fullImage} resizeMode="contain" />}
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  modalBackground: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
  fullImage: { width: '100%', height: '100%' },
});