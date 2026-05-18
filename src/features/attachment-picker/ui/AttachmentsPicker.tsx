import { useTheme } from '@/src/app/providers/ThemeProvider';
import { Attachment } from '@/src/shared/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { pickDocument, pickImage } from '../lib/attachmentUtils';
import AttachmentButton from './AttachmentButton';
import AttachmentList from './AttachmentList';

interface Props {
  attachments: Attachment[];
  onAdd: (attachments: Attachment[]) => void;
  onRemove: (id: string) => void;
}

export default function AttachmentsPicker({ attachments, onAdd, onRemove }: Props) {
  const { colors } = useTheme();

  const handlePickImage = async () => {
    const newAttachment = await pickImage();
    if (newAttachment) {
      onAdd([...attachments, newAttachment]);
    }
  };

  const handlePickDocument = async () => {
    const newAttachment = await pickDocument();
    if (newAttachment) {
      onAdd([...attachments, newAttachment]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <AttachmentButton
          icon="image-outline"
          label="Image"
          onPress={handlePickImage}
          color={colors.BUTTON.PRIMARY}
        />
        <AttachmentButton
          icon="document-outline"
          label="Document"
          onPress={handlePickDocument}
          color={colors.BUTTON.PRIMARY}
        />
      </View>
      <AttachmentList attachments={attachments} onRemove={onRemove} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  buttonRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
});