import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const LocationButton = ({ onPress, color }: { onPress: () => void; color: string }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Ionicons name="locate" size={20} color="#fff" />
    <Text style={styles.text}>My location</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, gap: 8 },
  text: { color: '#fff', fontWeight: 'bold' },
});