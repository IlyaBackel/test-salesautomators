import { useTheme } from '@/src/app/providers/ThemeProvider';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ConfirmButtonProps {
  onPress: () => void;
}

export const ConfirmButton = ({ onPress }: ConfirmButtonProps) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.BUTTON.PRIMARY }]}
      onPress={onPress}
    >
      <Text style={styles.text}>Confirm</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  text: { color: '#fff', fontWeight: 'bold' },
});