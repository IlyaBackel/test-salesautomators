import { useTheme } from '@/src/app/providers/ThemeProvider';
import { Attachment } from '@/src/shared/types/types';
import { StyleSheet, Text, View } from 'react-native';
import { AttachmentItem } from './AttachmentItem';

interface AttachmentListProps {
  attachments: Attachment[];
  onPress: (uri: string, mimeType: string) => void;
}

export const AttachmentList = ({ attachments, onPress }: AttachmentListProps) => {
  const { colors } = useTheme();
  if (attachments.length === 0) return null;

  return (
    <>
      <Text style={[styles.label, { color: colors.TEXT.PRIMARY }]}>Attachments</Text>
      <View style={styles.attachmentList}>
        {attachments.map((att) => (
          <AttachmentItem key={att.id} attachment={att} onPress={onPress} />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', marginTop: 16, marginBottom: 4 },
  attachmentList: { marginTop: 4, marginBottom: 8, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});