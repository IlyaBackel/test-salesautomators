import { useTheme } from '@/src/app/providers/ThemeProvider';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface InfoFieldProps {
  label: string;
  value?: string;
  customStyle?: TextStyle;
}

export const InfoField = ({ label, value, customStyle }: InfoFieldProps) => {
  const { colors } = useTheme();
  if (!value) return null;
  return (
    <>
      <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.TEXT.SECONDARY }, customStyle]}>{value}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', marginTop: 16, marginBottom: 4 },
  value: { fontSize: 16, marginBottom: 8, flexWrap: 'wrap', flexShrink: 1 },
});