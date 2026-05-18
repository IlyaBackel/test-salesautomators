import { useTheme } from '@/src/app/providers/ThemeProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface AndroidPickerProps {
  label: string;
  value: Date;
  mode: 'date' | 'time';
  minimumDate?: Date;
  onChange: (event: any, date: Date) => void;
}

export default function AndroidPicker({ label, value, mode, minimumDate, onChange }: AndroidPickerProps) {
  const { colors } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const formattedValue = mode === 'date'
    ? value.toLocaleDateString()
    : value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate && selectedDate !== value) {
      onChange(event, selectedDate);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { borderColor: colors.BORDER, backgroundColor: colors.BACKGROUND.CARD }]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={{ color: colors.TEXT.PRIMARY }}>{label}: {formattedValue}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value}
          mode={mode}
          onChange={handleChange}
          minimumDate={mode === 'date' ? minimumDate : undefined}
          display="spinner"
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 15 },
});