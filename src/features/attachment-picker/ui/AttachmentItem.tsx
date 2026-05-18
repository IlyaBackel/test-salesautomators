import { useTheme } from '@/src/app/providers/ThemeProvider';
import { Attachment } from '@/src/shared/types/types';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AttachmentItemProps {
  item: Attachment;
  onRemove: (id: string) => void;
}

export default function AttachmentItem({ item, onRemove }: AttachmentItemProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.attachmentItem,
        { backgroundColor: colors.BACKGROUND.CARD, borderColor: colors.BORDER },
      ]}
    >
      {item.mimeType.startsWith('image/') && (
        <Image source={{ uri: item.uri }} style={styles.thumbnail} />
      )}
      <Text style={[styles.fileName, { color: colors.TEXT.PRIMARY }]} numberOfLines={1}>
        {item.name}
      </Text>
      <TouchableOpacity onPress={() => onRemove(item.id)}>
        <Ionicons name="close-circle" size={24} color={colors.BUTTON.DELETE} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    gap: 8,
  },
  thumbnail: { width: 40, height: 40, borderRadius: 4 },
  fileName: { maxWidth: 120, fontSize: 12 },
});