import { HistoryItem, HistoryRecord } from '@/src/entities/history';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';



interface HistoryListProps {
  records: HistoryRecord[];
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export default function HistoryList ({ records, ListEmptyComponent }: HistoryListProps) {
  return (
    <FlatList
      data={records}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <HistoryItem item={item} />}
      contentContainerStyle={styles.list}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 16 },
});