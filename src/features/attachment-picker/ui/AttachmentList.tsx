import { Attachment } from '@/src/shared/types/types';
import { FlatList, StyleSheet } from 'react-native';
import AttachmentItem from './AttachmentItem';

interface AttachmentListProps {
  attachments: Attachment[];
  onRemove: (id: string) => void;
}

export default function AttachmentList({ attachments, onRemove }: AttachmentListProps) {
  if (attachments.length === 0) return null;

  return (
    <FlatList
      data={attachments}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AttachmentItem item={item} onRemove={onRemove} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { gap: 8 },
});