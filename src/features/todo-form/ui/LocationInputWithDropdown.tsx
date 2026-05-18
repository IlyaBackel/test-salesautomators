import { useTheme } from '@/src/app/providers/ThemeProvider';
import { addLocation } from '@/src/entities/location/model/locationsHistorySlice';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

interface LocationInputWithDropdownProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function LocationInputWithDropdown({ value, onChangeText, placeholder }: LocationInputWithDropdownProps) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const history = useAppSelector(state => state.locationHistory.items);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (item: string) => {
    onChangeText(item);
    setDropdownVisible(false);
  };

  const handleBlur = () => {
    if (value.trim()) {
      dispatch(addLocation(value.trim()));
    }
  };

  const historyToShow = history.slice(0, 10);

  console.log(history);

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { borderColor: colors.BORDER, backgroundColor: colors.BACKGROUND.CARD }]}>
        <TextInput
          style={[styles.input, { color: colors.TEXT.PRIMARY }]}
          placeholder={placeholder || 'Location (manual or select from history)'}
          placeholderTextColor={colors.TEXT.PLACEHOLDER}
          value={value}
          onChangeText={onChangeText}
          onBlur={handleBlur}
        />
        <TouchableOpacity onPress={() => setDropdownVisible(true)} style={styles.iconButton}>
          <Ionicons name="chevron-down" size={20} color={colors.TEXT.SECONDARY} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setDropdownVisible(false)}>
          <View style={[styles.modalContent, { backgroundColor: colors.BACKGROUND.CARD }]}>
            {historyToShow.length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.TEXT.SECONDARY }]}>No history yet</Text>
            ) : (
              <FlatList
                data={historyToShow}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                    <Text style={[styles.itemText, { color: colors.TEXT.PRIMARY }]}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 16 },
  iconButton: { padding: 8 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', borderRadius: 12, padding: 8, maxHeight: 300 },
  item: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  itemText: { fontSize: 16 },
  emptyText: { textAlign: 'center', padding: 20, fontSize: 14 },
});