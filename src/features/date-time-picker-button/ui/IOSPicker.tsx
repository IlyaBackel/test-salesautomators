import { useTheme } from '@/src/app/providers/ThemeProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View } from 'react-native';

interface IOSPickerProps {
  label: string;
  value: Date;
  mode: 'date' | 'time';
  minimumDate?: Date;
  onChange: (event: any, date: Date) => void;
}

export default function IOSPicker({ label, value, mode, minimumDate, onChange }: IOSPickerProps) {
  const { colors } = useTheme();

  const handleChange = (event: any, selectedDate?: Date) => {
    if (selectedDate && selectedDate !== value) {
      onChange(event, selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>{label}</Text>
      <View style={[styles.pickerWrapper, { borderColor: colors.BORDER }]}>
        <DateTimePicker
          value={value}
          mode={mode}
          onChange={handleChange}
          minimumDate={mode === 'date' ? minimumDate : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 15,
    gap: 10,
  },
  label: { fontSize: 17, fontWeight: '600' },
  pickerWrapper: { borderWidth: 1, borderRadius: 8, alignItems: 'center' },
});