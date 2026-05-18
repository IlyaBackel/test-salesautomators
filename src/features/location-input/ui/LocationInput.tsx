import { useTheme } from '@/src/app/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocationHistory } from '../hooks/useLocationHistory';
import { HistoryModal } from './HistoryModal';

interface LocationInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function LocationInput({ value, onChangeText, placeholder }: LocationInputProps) {
  const { colors } = useTheme();
  const { history } = useLocationHistory();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (item: string) => {
    onChangeText(item);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { borderColor: colors.BORDER, backgroundColor: colors.BACKGROUND.CARD }]}>
        <TextInput
          style={[styles.input, { color: colors.TEXT.PRIMARY }]}
          placeholder={placeholder || 'Location (manual or select from history)'}
          placeholderTextColor={colors.TEXT.PLACEHOLDER}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={() => setDropdownVisible(true)} style={styles.iconButton}>
          <Ionicons name="chevron-down" size={20} color={colors.TEXT.SECONDARY} />
        </TouchableOpacity>
      </View>

      <HistoryModal
        visible={dropdownVisible}
        onClose={() => setDropdownVisible(false)}
        items={history}
        onSelect={handleSelect}
      />
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
});