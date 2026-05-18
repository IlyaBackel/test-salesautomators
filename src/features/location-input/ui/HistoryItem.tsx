import { useTheme } from '@/src/app/providers/ThemeProvider';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface HistoryItemProps {
  text: string;
  onPress: (text: string) => void;
}

export const HistoryItem = ({ text, onPress }: HistoryItemProps) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(text)}>
      <Text style={[styles.itemText, { color: colors.TEXT.PRIMARY }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  itemText: { fontSize: 16 },
});