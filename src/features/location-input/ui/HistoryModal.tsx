import { useTheme } from '@/src/app/providers/ThemeProvider';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HistoryItem } from './HistoryItem';

interface HistoryModalProps {
  visible: boolean;
  onClose: () => void;
  items: string[];
  onSelect: (item: string) => void;
}

export const HistoryModal = ({ visible, onClose, items, onSelect }: HistoryModalProps) => {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={[styles.modalContent, { backgroundColor: colors.BACKGROUND.CARD }]}>
          {items.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.TEXT.SECONDARY }]}>No history yet</Text>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <HistoryItem text={item} onPress={onSelect} />}
            />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', borderRadius: 12, padding: 8, maxHeight: 300 },
  emptyText: { textAlign: 'center', padding: 20, fontSize: 14 },
});