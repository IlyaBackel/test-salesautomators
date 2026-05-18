import { useTheme } from '@/src/app/providers/ThemeProvider';
import { Attachment } from '@/src/shared/types/types';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface AttachmentItemProps {
  attachment: Attachment;
  onPress: (uri: string, mimeType: string) => void;
}

export const AttachmentItem = ({ attachment, onPress }: AttachmentItemProps) => {
  const { colors } = useTheme();
  const isImage = attachment.mimeType.startsWith('image/');

  return (
    <TouchableOpacity onPress={() => onPress(attachment.uri, attachment.mimeType)}>
      {isImage ? (
        <Image source={{ uri: attachment.uri }} style={styles.thumbnail} />
      ) : (
        <Text style={[styles.attachment, { color: colors.TEXT.SECONDARY }]}>
          {attachment.name} ({attachment.size ? `${Math.round(attachment.size / 1024)} KB` : 'file'})
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  thumbnail: { width: 80, height: 80, borderRadius: 8, marginRight: 8, marginBottom: 4 },
  attachment: { fontSize: 14, textDecorationLine: 'underline', marginBottom: 4 },
});