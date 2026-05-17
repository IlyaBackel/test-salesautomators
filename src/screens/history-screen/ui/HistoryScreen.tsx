import { useTheme } from '@/src/app/providers/ThemeProvider';
import { HistoryList } from '@/src/widgets/history-list';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../../store/hooks';

export default function HistoryScreen() {
  const { colors } = useTheme();
  const records = useAppSelector(state => state.history.records);

  const EmptyComponent = () => (
    <Text style={[styles.empty, { color: colors.TEXT.SECONDARY }]}>No actions yet</Text>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.BACKGROUND.PRIMARY }]}>
      <HistoryList records={records} ListEmptyComponent={EmptyComponent} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
});