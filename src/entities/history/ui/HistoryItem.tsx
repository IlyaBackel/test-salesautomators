import { useTheme } from '@/src/app/providers/ThemeProvider';
import { formatExecutionDateTime } from '@/src/shared/lib/date';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HistoryRecord } from '../model/historySlice';

interface HistoryItemProps {
  item: HistoryRecord;
}

const getActionConfig = (action: string) => {
  switch (action) {
    case 'CREATE':
      return { label: 'Created', color: '#4CAF50' };      // зелёный
    case 'EDIT':
      return { label: 'Edited', color: '#FFC107' };       // жёлтый
    case 'DELETE':
      return { label: 'Deleted', color: '#F44336' };      // красный
    case 'TOGGLE_STATUS':
      return { label: 'Status changed', color: '#2196F3' }; // синий
    default:
      return { label: action, color: '#999' };
  }
};

export default function HistoryItem ({ item }: HistoryItemProps) {
  const { colors } = useTheme();
  const { label, color } = getActionConfig(item.action);
  const bgColor = `${color}20`;

  return (
    <View style={[styles.card, { backgroundColor: bgColor, borderColor: color }]}>
      <Text style={[styles.title, { color: colors.TEXT.PRIMARY }]}>
        {label}: {item.todoTitle}
      </Text>
      {item.details && (
        <Text style={[styles.details, { color: colors.TEXT.SECONDARY }]}>
          {item.details}
        </Text>
      )}
      <Text style={[styles.date, { color: colors.TEXT.SECONDARY }]}>
        {formatExecutionDateTime(item.timestamp)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  details: { fontSize: 14, marginBottom: 4 },
  date: { fontSize: 12 },
});